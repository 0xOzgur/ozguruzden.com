import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://ozguruzden.com:1337',
        changeOrigin: true,
        secure: true,
      },
    },
  },
});