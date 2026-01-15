/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./public/**/*.{html,js}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        bounce: {
          '0%, 100%': { transform: 'translateY(-5%)' },
          '50%': { transform: 'translateY(5%)' },
        }
      }
    },
  },
  plugins: [],
}
