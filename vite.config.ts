import path from 'node:path';
// import basicSsl from '@vitejs/plugin-basic-ssl';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// const plugins = [react(), basicSsl({
//   /** name of certification */
//   name: 'test',
//   /** custom trust domains */
//   domains: ['*.custom.com'],
//   /** custom certification directory */
//   certDir: '/Users/.../.devServer/cert',
// })];

const plugins = [react()];

// https://vite.dev/config/
export default defineConfig({
  plugins,
  server: {
    proxy: {
      '/api': 'http://127.0.0.1:3000',
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
