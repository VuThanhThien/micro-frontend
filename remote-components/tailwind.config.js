/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        wave: {
          "0%, 100%": { height: "20%" },
          "50%": { height: "100%" },
        }
      },
      animation: {
        wave: "wave 1.25s ease-in-out infinite"
      }
    },
  },
  plugins: [],
}

