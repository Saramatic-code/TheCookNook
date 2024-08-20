/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#F3BFC4',
          DEFAULT: '#F29BAA',
          dark: '#D17384',
        },
        secondary: '#000000',
        background: '#FFFFFF',
      },
    },
  },
  plugins: [],
};
