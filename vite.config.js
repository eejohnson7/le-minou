import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import seoPlugin from './scripts/seo-plugin.mjs'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), seoPlugin()],
})
