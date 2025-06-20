/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'electric-blue': '#1E90FF',
        'electric-blue-light': '#60A5FA',
        'neon-green': '#00FF85',
        'neon-green-alt': '#10D9C4',
        'vibrant-orange': '#FF5722',
        'vibrant-amber': '#FBBF24',
        'coral-red': '#F87171',
      },
      animation: {
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
} 