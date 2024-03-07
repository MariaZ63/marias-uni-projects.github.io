import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base:'/marias-uni-projects.github.io/',
  plugins: [react()],
  
})
