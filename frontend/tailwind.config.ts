import type { Config } from 'tailwindcss'

export default {
  corePlugins: {
    preflight: false
  },
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        vietnam: ['Be Vietnam Pro', 'sans-serif']
      },
      colors: {
        primary: '#03363D',
        'white-color': '#F3F4F8',
        'red-color': '#E45353',
        'aqua-color': '#0CC4B6',
        'grey-color-50': '#E9E9E9',
        'grey-color-100': '#595959',
        'grey-color-150': '#D9D9D9',
        'white-all-color': "#FFFFFF",
        'dark-icon-color': "#4D4D4D",
        'black-color': "#262626",
      }
    }
  },
  plugins: []
} satisfies Config

