module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', 
    './public/index.html',
    './src/components/*.{js}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')]
}
