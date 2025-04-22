import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: './', // Certifique-se de que está no diretório correto.
  build: {
    outDir: 'dist',
  },
  publicDir: 'public',
});