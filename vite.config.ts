import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  optimizeDeps: {
    include: ['@pixi/layout/react']
  },
  resolve: {
    alias: {
      '@pixi/layout/react': '@pixi/layout/react'
    }
  }
})
