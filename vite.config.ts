// import { defineConfig, splitVendorChunkPlugin } from 'vite';
// import vue from '@vitejs/plugin-vue';
// import path from 'path';
// import inject from '@rollup/plugin-inject';
// import GlobalsPolyfills from '@esbuild-plugins/node-globals-polyfill';
//
// // https://vitejs.dev/config/
// export default defineConfig({
//     plugins: [vue(), splitVendorChunkPlugin()],
//     resolve: {
//         alias: {
//             '@': path.resolve(__dirname, '/src'),
//             process: 'process/browser',
//             stream: 'stream-browserify',
//             Buffer: 'safe-buffer',
//             util: 'util',
//             path: 'path-browserify',
//         },
//     },
//     define: {
//         'process.env': {},
//     },
//     build: {
//         minify: false,
//         target: ['ESNext'],
//         rollupOptions: {
//             plugins: [inject({ Buffer: ['buffer', 'Buffer'] })],
//         },
//     },
//     optimizeDeps: {
//         esbuildOptions: {
//             // Node.js global to browser globalThis
//             define: {
//                 global: 'globalThis',
//             },
//             // Enable esbuild polyfill plugins
//             plugins: [
//                 GlobalsPolyfills({
//                     process: true,
//                     buffer: true,
//                 }),
//             ],
//         },
//     },
// });
