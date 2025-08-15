import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/chat': '',
    },
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, `/src`), // @ = /src
    },
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
});
