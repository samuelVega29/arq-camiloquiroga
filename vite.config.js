import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const siteUrl = (env.VITE_SITE_URL || 'https://arq-camiloquiroga.pages.dev/').replace(
    /\/?$/,
    '/',
  )

  return {
    base: env.VITE_BASE_PATH || '/',
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'site-url',
        transformIndexHtml(html) {
          return html.replaceAll('%VITE_SITE_URL%', siteUrl)
        },
      },
    ],
  }
})
