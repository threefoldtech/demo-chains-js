import { createApp } from 'vue';
import App from './App.vue';
import './index.css';
import router from './router';
import { Buffer } from 'buffer';
import process from 'process';
import sodium from 'libsodium-wrappers';
import { createLoginInstance, username } from './components/Login/login.service';
import { cryptoWaitReady } from '@polkadot/util-crypto';

window.Buffer = Buffer;
window.process = process;
const init = async () => {
    await sodium.ready;

    await cryptoWaitReady();

    await createLoginInstance();

    router.beforeEach(async (to, from, next) => {
        if (!username.value && to.name != 'login' && to.name != 'callback') {
            await router.push({ name: 'login' });
        }
        next();
    });

    createApp(App).use(router).mount('#app');
};
init();
