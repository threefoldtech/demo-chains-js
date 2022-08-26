<template>
    <div class="flex flex-row p-4">
        <div v-for="chain in ChainTypes">
            <div
                @click="selectedChain = chain"
                :class="selectedChain === chain ? 'border-b-2 border-blue-500 text-blue-500' : 'border-transparent'"
                class="mx-1 cursor-pointer border-b-2 p-4 hover:border-blue-500 hover:text-blue-500"
            >
                {{ chain }}
            </div>
        </div>
    </div>

    <div class="p-4">
        <StellarNative v-if="selectedChain === ChainTypes.STELLAR"></StellarNative>
        <StellarThreefold v-if="selectedChain === ChainTypes.STELLARTF"></StellarThreefold>
        <Substrate v-if="selectedChain === ChainTypes.TFCHAIN"></Substrate>
        <Binance v-if="selectedChain === ChainTypes.BINANCE"></Binance>
        <Algorand v-if="selectedChain === ChainTypes.ALGORAND"></Algorand>
    </div>

    <div v-if="!username || !derivedSeed" class="absolute top-8 right-8 cursor-pointer">
        <svg
            @click="authenticateUser"
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
        </svg>
    </div>

    <div v-else class="absolute bottom-8 left-8">
        <div><span class="font-bold">Username: </span> {{ username }}</div>
        <!--        <div><span class="font-bold">derivedSeed: </span> {{ derivedSeed }}</div>-->
    </div>
</template>

<script lang="ts" setup>
    import { ref } from 'vue';
    import StellarNative from '../Stellar/StellarNative/StellarNative.vue';
    import Substrate from '../Substrate/Substrate.vue';
    import { useRouter } from 'vue-router';

    import { derivedSeed, username } from '../Login/login.service';
    import StellarThreefold from '../Stellar/StellarThreefold/StellarThreefold.vue';
    import { ChainTypes } from './services/core.service';
    import Algorand from '../Algorand/Algorand.vue';
    import Binance from '../Binance/Binance.vue';

    const router = useRouter();

    const authenticateUser = async () => {
        await router.push({ name: 'login' });
    };

    const selectedChain = ref<ChainTypes>(ChainTypes.STELLAR);
</script>
