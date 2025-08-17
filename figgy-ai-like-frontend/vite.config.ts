import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/chat': 'https://h5api.m.taobao.com/h5/mtop.alitrip.fliggy.channel.ai.plan.chat/2.0',
    },
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, `./src`),
    },
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
});
