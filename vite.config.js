import { defineConfig } from 'vite'

export default defineConfig({
  // Basic vite config for vanilla projects
  base: '/',
  build: {
    outDir: 'dist',
  },
  server: {
    port: 3000,
  }
})
