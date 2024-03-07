import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build',
    assetsInclude: ['**/*.png','**/*.JPG', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.svg'], 
  }
})
