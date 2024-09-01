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
          light: '#F3BFC4', // Light variant of primary color
          DEFAULT: '#F29BAA', // Default primary color
          dark: '#D17384', // Dark variant of primary color
        },
        secondary: '#000000', // Secondary color
        background: '#FFFFFF', // Background color
        mutedPink: '#fcebed', // Custom muted pink color
      },
    },
  },
  plugins: [],
};
