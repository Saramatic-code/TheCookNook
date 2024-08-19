module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#F3BFC4', // Light Pink
          DEFAULT: '#F29BAA', // Main Pink from logo
          dark: '#D17384', // Darker Pink
        },
        secondary: '#000000', // Black
        background: '#FFFFFF', // White/Light Pink
      },
    },
  },
  plugins: [],
}
