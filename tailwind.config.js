/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      boxShadow: {
        "3xl": '0px 16px 64px rgba(55, 0, 98, 0.2)'
      }
    },
    colors: {
      black: "#000000",
      white: "#ffffff",
      grey: "#999999",
      "purple-darkest": "#19102d",
      "purple-dark": "#28133f",
      purple: "#34184B",
      "purple-light": "#482168",
      "purple-lightest": "#983bf6",

      // white: "#000000",
    },
    fontFamily: {
      montserrat: ["Montserrat", "sans-serif"],
    },
    animation: {
      "bounce-slow": "bounce 3s linear infinite",
      "pulse-slow": "pulse 3s linear infinite",
    },
  },

  plugins: [],
};
