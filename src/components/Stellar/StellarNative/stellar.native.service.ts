import { Keypair as StellarKeyPair, Server } from 'stellar-sdk';

import { decodeBase64 } from 'tweetnacl-util';

export const createRandomKeyPair = (): StellarKeyPair => {
    return StellarKeyPair.random();
};

export const getStellarKeyPairFromDerivedSeed = (seed: string) => {
    return StellarKeyPair.fromRawEd25519Seed(<Buffer>decodeBase64(seed));
};

export const activateStellarAccount = async (publicKey: string) => {
    try {
        await fetch(`https://friendbot.stellar.org?addr=${encodeURIComponent(publicKey)}`);
        return true;
    } catch (e) {
        return false;
    }
};

export const getStellarAccount = async (publicKey: string) => {
    const server = new Server('https://horizon-testnet.stellar.org');

    try {
        const account = await server.loadAccount(publicKey);
        return account.balances;
    } catch (e) {
        return null;
    }
};
