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
        mutedPink: '#fcebed',
        accent: {
          teal: '#A8DADC',
          yellow: '#F8E9A1',
          lavender: '#E6E6FA',
        },
      },
      fontFamily: {
        belleza: ['Belleza', 'sans-serif'],
        josefin: ['Josefin Sans', 'sans-serif'], // Add Josefin Sans font family
      },
    },
  },
  plugins: [],
};
