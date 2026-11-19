import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const defaultSiteUrl = 'https://arq-camiloquiroga.pages.dev/'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const siteUrl = (env.VITE_SITE_URL || defaultSiteUrl).replace(/\/?$/, '/')
  process.env.VITE_SITE_URL = siteUrl

  return {
    base: env.VITE_BASE_PATH || '/',
    plugins: [react(), tailwindcss()],
  }
})
