import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const currentDir = dirname(fileURLToPath(import.meta.url))

export default defineNuxtConfig({
  debug: true,
  dev: true,
  alias: { '#nuxt-store-core': join(currentDir, './src/') },
  routeRules: {
    '/sanctum/csrf-cookie': { ssr: false },
    '/api/**': { ssr: false },
    '/sanctum/account/**': { ssr: false },
    '/sanctum/auth/**': { ssr: false },
  },
  srcDir: 'src',
  modules: ['@vueuse/nuxt', '@pinia/nuxt', '@nuxtjs/i18n', '@sidebase/nuxt-session'],
  session: {
    session: {
      expiryInSeconds: 60 * 60 * 48,
    },
  },
  // localization - i18n config
  i18n: {
    locales: [
      {
        code: 'en',
        file: 'en-US.json',
      },
    ],
    defaultLocale: 'en',
    lazy: true,
    langDir: 'locales/',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root', // recommended
    },
    vueI18n: {
      legacy: false,
      locale: 'en',
      fallbackLocale: 'en',
      availableLocales: ['en'],
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
})
