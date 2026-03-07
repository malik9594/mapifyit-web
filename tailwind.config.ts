/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#020617", // Slate 950
        accent: "#3b82f6",     // Blue 500
      },
      backgroundImage: {
        'glow-conic': 'conic-gradient(from 180deg at 50% 50%, #1e40af 0deg, transparent 360deg)',
      },
    },
  },
  plugins: [],
};