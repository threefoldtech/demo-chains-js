import axios from 'axios';
import { Keypair as StellarKeyPair, Networks, Server, Transaction } from 'stellar-sdk';

export const getStellarTFActivationTransaction = async (pk: string) => {
    const headers = { 'Content-Type': 'application/json' };
    const url = 'https://testnet.threefold.io/threefoldfoundation/activation_service/activate_account';
    const data = { address: pk };

    try {
        const response = await axios.post(url, data, { headers });
        const activateAccountResult = JSON.parse(response.data)?.activation_transaction;
        if (!activateAccountResult) {
            console.log('No transaction available');
            return null;
        }

        return new Transaction(activateAccountResult, Networks.TESTNET);
    } catch (e) {
        console.error(e);
        return null;
    }
};

export const activateStellarTfAccount = async (kp: StellarKeyPair) => {
    const transaction = await getStellarTFActivationTransaction(kp.publicKey());
    if (!transaction) {
        return false;
    }

    return await submitStellarAccountActivationTransaction(transaction, kp);
};

const submitStellarAccountActivationTransaction = async (tx: Transaction, kp: StellarKeyPair) => {
    try {
        tx.sign(kp);
        const server = new Server('https://horizon-testnet.stellar.org');

        await server.submitTransaction(tx);
    } catch (e) {
        return false;
    }
};
