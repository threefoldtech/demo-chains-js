import { defineConfig, splitVendorChunkPlugin } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), splitVendorChunkPlugin()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '/src'),
            process: 'process/browser',
            stream: 'stream-browserify',
            Buffer: 'safe-buffer',
            util: 'util',
        },
    },
    define: {
        'process.env': {},
    },
    build: {
        minify: false,
        target: ['ESNext'],
    },
});
