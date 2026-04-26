import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [], // Added for Wrangler compatibility
  base: '/',
  build: {
    outDir: 'dist',
  },
  server: {
    port: 3000,
  }
})
