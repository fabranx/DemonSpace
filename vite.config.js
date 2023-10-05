import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  server:{
    port: 6173,
  },
  build: {
    target: 'esnext',
  }
})
