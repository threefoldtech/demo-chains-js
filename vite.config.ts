import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';
import { resolve } from 'path';

export default defineConfig({
    plugins: [vue()],
    define: {
        'process.env': {},
    },
    resolve: {
        alias: {
            web3: path.resolve(__dirname, './node_modules/web3/dist/web3.min.js'),
            process: 'process/browser',
            stream: 'stream-browserify',
            zlib: 'browserify-zlib',
            https: 'agent-base',
            '@': resolve(__dirname, './src'),
        },
    },
});
