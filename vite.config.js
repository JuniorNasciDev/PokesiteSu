import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'public/dist',  // Ou 'dist', se preferir. Este é o diretório de saída
    emptyOutDir: true       // Certifica-se de que a pasta de saída seja limpa antes de cada build
  }
});