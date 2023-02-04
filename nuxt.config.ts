const themeLocalPackagePath = process.env.NUXT_APP_THEME_LOCAL_PACKAGE_PATH
const nuxtThemePreset = process.env.NUXT_APP_PRESET || ''
const allowServerFilesFrom: Array<any> = themeLocalPackagePath
  ? [
      process.env.NUXT_APP_THEME_LOCAL_PACKAGE_PATH,
    ]
  : []
export default defineNuxtConfig({
  extends: [
    themeLocalPackagePath,
  ],
  runtimeConfig: {
    // Server side only env variables
    public: {
      appPreset: nuxtThemePreset,
    },
  },
  srcDir: 'src',
  components: themeLocalPackagePath
    ? [
        {
          path: `${themeLocalPackagePath}/components/${nuxtThemePreset}`,
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
  tailwindcss: {
    configPath: '~/tailwind.config.js',
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
