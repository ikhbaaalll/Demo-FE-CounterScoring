/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          300: "#A6D0DD",
          400: "#8bb9c7",
          500: "#6a9cab",
          600: "#478596",
          700: "#25788f",
          800: "#056580"
        },
        warning: {
          500: "#FFF9DE"
        },
        error: {
          500: "#FF6969",
          700: "#f54949",
        }
      },
    },
  },
  plugins: [],
}
