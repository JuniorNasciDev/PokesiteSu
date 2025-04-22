import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'public',  // O diretório para os arquivos gerados
    emptyOutDir: true, // Limpa a pasta antes de gerar os novos arquivos
  }
});