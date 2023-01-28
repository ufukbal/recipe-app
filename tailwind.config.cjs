/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    listStyleType: {
      none: 'none',
      disc: 'disc',
      decimal: 'decimal',
      circle: 'circle',
    },
    extend: {
      fontFamily: {
        Quicksand: ['Quicksand', "sans-serif"],
        'sans': ['Quicksand', ...defaultTheme.fontFamily.sans],

      }
    },
  },
  plugins: [],
}
