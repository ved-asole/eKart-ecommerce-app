import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import viteCompression from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteCompression({
      algorithm: "brotliCompress",
      ext: ".br",
      deleteOriginFile: false
    }),
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
      deleteOriginFile: false
    })
  ],
  css: {
    postcss: './postcss.config.js'
  },
  build: {
    minify: 'terser', // Use 'terser' for minification
    terserOptions: {
      compress: {
        drop_console: true, // Remove console logs
      }
    },
    cssCodeSplit: true
  },
});