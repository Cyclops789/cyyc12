const { createThemes } = require('tw-colors');
const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      scale: {
        '95': '0.95',
      },
      colors: {
        primary: 'rgba(42,45,50)',
        secondary: 'rgba(42,45,50,0.92)',
        custom1: 'rgb(21,29,36)',
      }
    },
  },
  plugins: [
    createThemes({
      red: {
        'base': colors.red
      },
      yellow: {
        'base': colors.yellow
      },
      orange: {
        'base': colors.orange
      },
      white: {
        'base': colors.white
      },
      green: {
        'base': colors.green
      },
    })
  ],
}

