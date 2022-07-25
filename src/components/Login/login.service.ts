import { generateRandomString, ThreefoldLogin } from '@threefoldjimber/threefold_login';
import { useLocalStorage } from '@vueuse/core';
import { Ref } from 'vue';

const threeFoldAPIHost = 'https://login.threefold.me';
const appId = 'example-chains.staging.jimber.io';
const seedPhrase =
    'upgrade math cigar submit resist grape peace better chaos jewel scrap surround bench public jazz evidence gas media slender venture harsh equal bulk gap';
const redirectUrl = 'callback';

export let state: Ref<string> = useLocalStorage('state', '');
export let login: ThreefoldLogin;

export let username: Ref<string> = useLocalStorage('username', '');
export let derivedSeed: Ref<string> = useLocalStorage('derivedSeed', '');

export const generateLoginUrl = async () => {
    state.value = generateRandomString();

    const extraParams = {
        scope: JSON.stringify({ derivedSeed: true }),
    };

    return login.generateLoginUrl(state.value, extraParams);
};

export const createLoginInstance = async () => {
    login = new ThreefoldLogin(threeFoldAPIHost, appId, seedPhrase, redirectUrl, '');
    await login.init();
};
