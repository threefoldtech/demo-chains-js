<template>
    <div v-if="isBusy">
        <LoadingModal :text="loadingText"></LoadingModal>
    </div>

    <div class="h-full" v-if="loadingData">
        <div class="flex h-full w-full flex-col items-center justify-center">
            <svg
                class="mr-2 inline h-6 w-6 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                />
                <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                />
            </svg>
        </div>
    </div>

    <div v-else>
        <div class="flex flex-col">
            <div class="mt-4 p-4">
                <div class="flex flex-row justify-between">
                    <div class="pb-1 text-xl font-bold">STELLAR TFCHAIN ACCOUNT</div>
                    <PlusButton v-if="!stellarAccount" @click="activateAccount"></PlusButton>
                </div>
                <hr class="mt-2 cursor-pointer border-[0.5px] border-gray-200" />
            </div>

            <div v-if="stellarTFKeyPair" class="p-4">
                <div><span class="font-bold">address:</span> {{ stellarTFKeyPair.publicKey() }}</div>
                <div><span class="font-bold">sk:</span> {{ stellarTFKeyPair.secret() }}</div>
            </div>

            <div class="mt-4" v-if="!stellarAccount">
                <div class="text-center text-sm text-gray-400">
                    No stellar account found with this seed, please create your Stellar Account using the button.
                </div>
            </div>

            <div v-if="stellarAccount" class="p-4">
                <div>
                    <span class="font-bold">Balance:</span>

                    <div v-for="b in stellarAccount">{{ b.balance }} {{ b.asset_code ? b.asset_code : 'XLM' }}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
    import { ref } from 'vue';
    import LoadingModal from '../../Core/modals/LoadingModal.vue';
    import PlusButton from '../../Core/icons/PlusButton.vue';
    import { Keypair as StellarKeyPair } from 'stellar-base';
    import { getStellarAccount, getStellarKeyPairFromDerivedSeed } from '../StellarNative/stellar.native.service';
    import { derivedSeed } from '../../Login/login.service';
    import { activateStellarTfAccount } from './stellar.threefold.service';

    const loadingText = 'CREATING YOUR STELLAR ACCOUNT';

    const isBusy = ref<boolean>(false);
    const loadingData = ref<boolean>(true);

    const stellarAccount = ref();

    const stellarTFKeyPair = ref<StellarKeyPair>();

    const init = async () => {
        stellarTFKeyPair.value = getStellarKeyPairFromDerivedSeed(derivedSeed.value);

        if (!stellarTFKeyPair.value) {
            console.log('No Stellar-TF kp available');
            return;
        }

        await retrieveStellarAccount(stellarTFKeyPair.value?.publicKey());
        loadingData.value = false;
    };

    const retrieveStellarAccount = async (pk: string) => {
        const account = await getStellarAccount(pk);
        if (!account) {
            console.log('No account found');
            return;
        }

        stellarAccount.value = account;
    };

    const activateAccount = async () => {
        if (!stellarTFKeyPair.value) {
            console.log('No StellarNative KP available');
            return;
        }

        isBusy.value = true;

        const activated = await activateStellarTfAccount(stellarTFKeyPair.value);
        if (!activated) {
            isBusy.value = false;
            console.log('Could not activate StellarNative Account: Error from TF service');
        }

        await retrieveStellarAccount(stellarTFKeyPair.value?.publicKey());
        isBusy.value = false;
    };

    init();
</script>
