<template></template>
<script lang="ts" setup>
    import { SigningStargateClient } from '@cosmjs/stargate';

    import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';

    const mnemonic =
        'monitor rebel guitar sting surprise adult ethics skate found slight target tired horn gospel problem outer adapt sugar pretty gossip van beyond screen little';

    const init = async () => {
        const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic);

        const [firstAccount] = await wallet.getAccounts();
        const rpcEndpoint = 'https://rpc.testnet.cosmos.network/';
        const client = await SigningStargateClient.connectWithSigner(rpcEndpoint, wallet);
    };

    init();
</script>
