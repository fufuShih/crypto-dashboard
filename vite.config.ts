import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@pixi/layout/react']
  },
  resolve: {
    alias: {
      '@pixi/layout/react': '@pixi/layout/react'
    }
  }
})
