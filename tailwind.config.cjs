/** @type {DefaultColors} */
const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')

module.exports = {
  darkMode: 'class',
  content: [
    './src/components/**/*.{js,vue,ts}',
    './src/layouts/**/*.vue',
    './src/pages/**/*.vue',
    './src/plugins/**/*.{js,ts}',
    './src/app.vue',
  ],
  // Add all grid columns and rows to the purge safelist
  safelist: [
    ...Array.from({ length: 12 }, (_, i) => `col-span-${i + 1}`),
    ...Array.from({ length: 12 }, (_, i) => `col-start-${i + 1}`),
    ...Array.from({ length: 12 }, (_, i) => `col-end-${i + 1}`),
    ...Array.from({ length: 12 }, (_, i) => `row-span-${i + 1}`),
    ...Array.from({ length: 12 }, (_, i) => `row-start-${i + 1}`),
    ...Array.from({ length: 12 }, (_, i) => `row-end-${i + 1}`),
  ],
  theme: {
    extend: {
      screens: {
        '2xl': '1536px',
        '3xl': '1600px',
        '4xl': '1920px',
        '5xl': '2560px',
      },

      colors: {
        danger: colors.rose,
        primary: colors.blue,
        success: colors.green,
        warning: colors.yellow,

        brand: {
          50: '#fbf9f1',
          100: '#f6f2de',
          200: '#ede2bb',
          300: '#e1cc90',
          400: '#d3af62', // default
          500: '#ca9a45',
          600: '#bc843a',
          700: '#9c6a32',
          800: '#7e542e',
          900: '#664628',
          DEFAULT: '#d3af62',
        },
      },
      fontFamily: {
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        xxs: '.625rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms', {
      strategy: 'class',
    }),
    require('@tailwindcss/aspect-ratio'),
    require('@vueform/slider/tailwind'),
    plugin(({ addComponents, theme }) => {
      addComponents({
        '.border-base': {
          borderColor: theme('color.neutral.200'),
          borderWidth: theme('borderWidth.DEFAULT'),
        },
        '.container': {
          'max-width': '100%',
          '@screen 4xl': {
            'max-width': '1600px',
          },
          '@screen 5xl': {
            'max-width': '1920px',
          }
        }
      })
    }),
  ],
}
