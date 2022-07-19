import axios from 'axios';
import { ApiPromise, WsProvider } from '@polkadot/api';

import types from './substrate.types';
import { ref } from 'vue';
import { toNumber } from 'lodash';

export interface SubstrateAccountBalance {
    free: number;
    reserved: number;
    miscFrozen: number;
    feeFrozen: number;
}

export interface SubstrateAccount {
    consumers: number;
    data: SubstrateAccountBalance;
    nonce: number;
    providers: number;
}

const apiCache = ref<Promise<ApiPromise>>();

export const activateTFChainAccount = async (substrateKeyRingAddress: string) => {
    const headers = { 'Content-Type': 'application/json' };
    const url = 'https://activation.test.grid.tf/activation/activate';
    const data = { substrateAccountID: substrateKeyRingAddress };

    await axios.post(url, data, { headers });

    while (true) {
        const balance = await getSubstrateAssetBalances(substrateKeyRingAddress);
        console.log(balance);
        if (balance > 0) {
            break;
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
};

export const getSubstrateApi = async (): Promise<ApiPromise> => {
    if (apiCache.value) {
        const api = await apiCache.value;
        await api.isReady;
        return api;
    }

    const endpoint = 'wss://tfchain.test.grid.tf';
    const provider = new WsProvider(endpoint);

    provider.on('disconnected', () => {
        console.log('TFChain disconnect');
    });

    apiCache.value = ApiPromise.create({ provider, types });
    const api = await apiCache.value;
    await api.isReady;

    return api;
};

export const getSubstrateAssetBalances = async (publicKey: string): Promise<number> => {
    const api = await getSubstrateApi();

    const { data: balances }: any = await api.query.system.account(publicKey);
    return toNumber(balances.free.toJSON() / 1e7);
};

export const getSubstrateAccount = async (publicKey: string): Promise<SubstrateAccount | null> => {
    const api = await getSubstrateApi();

    //@ts-ignore
    const data = (await api.query.system.account(publicKey)).toJSON() as SubstrateAccount;

    if (data.providers == 0) {
        return null;
    }

    return data;
};
