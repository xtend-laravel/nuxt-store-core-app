import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const currentDir = dirname(fileURLToPath(import.meta.url))

export default defineNuxtConfig({
  alias: { '#nuxt-store-core': join(currentDir, './src/') },
  routeRules: {
    '/_nuxt/**': { headers: { 'Cache-Control': 's-maxage=0' } },
    '/api/**': { cors: true },
    '/sanctum/csrf-cookie': { ssr: false },
    '/sanctum/account/**': { ssr: false },
    '/sanctum/auth/**': { ssr: false },
  },
  components: {
    global: true,
    dirs: [join(currentDir, './src/components')],
  },
  srcDir: 'src',
  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt',
    ['unplugin-icons/nuxt', {}],
    'nuxt-swiper',
    'nuxt-headlessui',
    '@nuxtjs/i18n',
    '@sidebase/nuxt-session',
    'dayjs-nuxt',
  ],
  session: {
    session: {
      expiryInSeconds: 60 * 60 * 48,
    },
  },
  typescript: {
    tsConfig: {
      compilerOptions: {
        strict: true,
        types: ['@pinia/nuxt', './type.d.ts'],
      },
    },
  },
  vite: {
    build: {
      rollupOptions: {
        external: ['vue/server-renderer'],
      },
    },
  },
})
