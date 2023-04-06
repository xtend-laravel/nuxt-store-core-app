import * as swiper from 'swiper'
import { addComponent, addImports, defineNuxtModule, extendViteConfig } from '@nuxt/kit'

import type { SwiperOptions as SwiperInterface } from 'swiper/types'

type SwiperStyleLangType = 'css' | 'scss'
type SwiperModulesType =
  | 'a11y'
  | 'autoplay'
  | 'controller'
  | 'free-mode'
  | 'grid'
  | 'hash-navigation'
  | 'history'
  | 'keyboard'
  | 'manipulation'
  | 'mousewheel'
  | 'navigation'
  | 'pagination'
  | 'parallax'
  | 'scrollbar'
  | 'thumbs'
  | 'virtual'
  | 'zoom'
  | `effect-${SwiperInterface['effect']}`
interface SwiperModuleOptions {
  /**
   * The prefix to use for the Swiper Modules to import.
   * This is useful for importing only the modules you need and
   * avoiding importing the entire Swiper library.
   *
   * e.g. `${prefix}Autoplay` -> `SwiperAutoplay`
   *
   * @default 'Swiper' - import components from 'swiper/vue' by default
   */
  prefix?: string

  /**
   * Which type of lang of styles to import
   *
   * @default 'css' - imports css from 'swiper/css' by default
   */
  styleLang?: SwiperStyleLangType

  /**
   * Swiper modules to import
   *
   * '*' - imports all modules
   * '['thumbs', 'lazy']' - imports only specified modules
   *
   * @default '*' - imports all modules by default
   */
  modules?: '*' | SwiperModulesType[]
}

export default defineNuxtModule<SwiperModuleOptions>({
  meta: {
    name: 'nuxt-swiper',
    version: '1.1.0',
    configKey: 'swiper',
  },
  defaults: {
    prefix: 'Swiper',
    styleLang: 'css',
    modules: '*',
  },
  hooks: {
    'prepare:types': (ctx) => {
      ctx.tsConfig.compilerOptions!.types.push('swiper/vue')
      ctx.references.push({
        types: 'swiper/vue',
      })
    },
  },
  setup(_options, nuxt) {
    const { styleLang, prefix, modules } = _options

    const cssImports = [`swiper/${styleLang}`]
    const componentImports = ['Swiper', 'SwiperSlide']
    const moduleImports = [
      {
        name: 'useSwiper',
        as: 'useSwiper',
        from: 'swiper/vue',
      },
      {
        name: 'useSwiperSlide',
        as: 'useSwiperSlide',
        from: 'swiper/vue',
      },
    ]

    // Import Each Swiper Module & CSS if it exists.
    for (const [key, _] of Object.entries(swiper)) {
      // Turn key to snake-case.
      const snakeCase: string = key
        .replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2')
        .replace(/^-/, '')
        .toLowerCase()

      const hasModule = modules === '*' || (Array.isArray(modules) && modules.includes(snakeCase as any))

      if (hasModule && !['default', 'Swiper'].includes(key)) {
        // Don't import if there is no css.
        const noCssInModules = [
          'autoplay',
          'controller',
          'effect-coverflow',
          'hash-navigation',
          'history',
          'keyboard',
          'manipulation',
          'mousewheel',
          'parallax',
          'thumbs',
        ]

        // Push Import Styles for each module
        if (!noCssInModules.includes(snakeCase)) {
          cssImports.push(`swiper/${styleLang}/${snakeCase}`)
        }

        // Import Swiper Modules
        moduleImports.push({
          name: key,
          as: `${prefix}${key}`,
          from: 'swiper',
        })
      }
    }

    // Loop through each component to add to Nuxt.
    // imports types for intellisense.
    for (const cName of componentImports) {
      addComponent({
        name: cName,
        export: cName,
        filePath: 'swiper/vue',
      })
    }

    // Add Composables imports from `swiper/vue`.
    addImports(moduleImports)

    // Add CSS Imports to the nuxt option.
    nuxt.options.css = [...nuxt.options.css, ...cssImports]

    // Add Manual Chunks for Swiper for Vite.
    // for a more optimized build.
    extendViteConfig((config) => {
      config.build = config.build || {}
      config.build.rollupOptions = config.build.rollupOptions || {}
      config.build.rollupOptions.output = config.build.rollupOptions.output || {}

      config.build.rollupOptions.output = {
        ...config.build.rollupOptions.output,
        manualChunks: (id) => {
          if (id.includes('/node_modules/swiper')) {
            return 'swiper-vue'
          }
        },
      }
    })
  },
})

declare module '@nuxt/schema' {
  interface NuxtConfig {
    swiper?: SwiperModuleOptions
  }
  interface NuxtOptions {
    swiper?: SwiperModuleOptions
  }
}
