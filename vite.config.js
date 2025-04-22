import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'public/dist',  // Diretório de saída para os arquivos compilados
    emptyOutDir: true,      // Limpa o diretório antes de gerar o novo build
    rollupOptions: {
      input: 'public/index.html'  // Certifique-se de que o Vite está construindo a partir de 'public/index.html'
    }
  }
});