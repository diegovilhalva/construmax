/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#E02020',
        secondary: '#FFD54F',
        concrete: '#f5f5f5',
        metal: '#374151',
        success: '#4CAF50',
        earth: '#795548'
      }
    },
  },
  plugins: [],
}