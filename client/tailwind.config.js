/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vedic: {
          saffron: "#F59E0B",
          gold: "#D97706",
          amber: "#B45309",
          maroon: "#7C2D12",
          navy: "#0F172A",
          darkNavy: "#090D16",
          cardNavy: "#1E293B",
          borderNavy: "#334155",
          accent: "#FDE047"
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Cinzel', 'Georgia', 'serif']
      }
    },
  },
  plugins: [],
}
