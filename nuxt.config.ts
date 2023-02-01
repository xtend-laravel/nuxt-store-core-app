const themeLocalPackagePath = process.env.NUXT_APP_THEME_LOCAL_PACKAGE_PATH
const allowServerFilesFrom: Array<any> = themeLocalPackagePath
  ? [
      process.env.NUXT_APP_THEME_LOCAL_PACKAGE_PATH,
    ]
  : []
export default defineNuxtConfig({
  extends: [
    process.env.NUXT_APP_THEME_LOCAL_PACKAGE_PATH,
  ],
  runtimeConfig: {
    // Server side only env variables
    public: {
      appPreset: process.env.NUXT_APP_PRESET || 'default',
    },
  },
  srcDir: 'src',
  components: themeLocalPackagePath
    ? [
        {
          path: `${process.env.NUXT_APP_THEME_LOCAL_PACKAGE_PATH}/components/${process.env.NUXT_APP_PRESET}`,
          pathPrefix: false,
        },
      ]
    : undefined,
  modules: [
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/i18n',
  ],
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
  vite: {
    logLevel: 'info',
    server: {
      fs: {
        allow: allowServerFilesFrom,
      },
    },
  },
})
