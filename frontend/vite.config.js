import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@isd': path.resolve(__dirname, '../ISD'),
      'lucide-react': path.resolve(__dirname, 'node_modules/lucide-react'),
      'three': path.resolve(__dirname, 'node_modules/three')
    }
  },
  server: {
    fs: {
      allow: ['..']
    }
  },
  css: {
    postcss: {}
  }
})
