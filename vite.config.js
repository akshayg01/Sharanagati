import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// If deploying to a subpath (e.g. GitHub Pages project site), set base to '/Sharanagati/'.
export default defineConfig({
  plugins: [react()],
  base: './',
})
