import { defineConfig } from 'vite';

export default defineConfig({
  root: 'public',  // Configura o diretório de entrada como a pasta public
  build: {
    outDir: '../dist', // Define o diretório de saída como 'dist'
    rollupOptions: {
      input: '/index.html', // Define o arquivo de entrada
    },
  },
});