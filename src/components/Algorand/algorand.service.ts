import axios from 'axios';

export const getAlgorandBalance = async (address: string): Promise<number | null> => {
    const url = `https://algoindexer.testnet.algoexplorerapi.io/v2/accounts/${address}`;

    try {
        const r = await axios.get(url);
        return r?.data?.account?.amount;
    } catch (e) {
        return null;
    }
};
