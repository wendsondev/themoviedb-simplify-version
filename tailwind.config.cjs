/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{tsx,html,css}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto, sans-serif']
      },
      colors: {
        green: {
          500: '#14FF00'
        },
        purple: {
          700: '#5C16C5',
          900: '#2D0C5E'
        },
        orange: {
          700: '#D18000'
        },
        gray: {
          200: '#DDDDDD',
          400: '#ADADAD',
          600: '#646464',
          800: '#323232'
        }
      }
    }
  },
  plugins: []
};
