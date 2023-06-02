/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    
    extend: {},
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
    extend: {},
    fontFamily: {
      montserrat: ["Montserrat", "sans-serif"],
    },
  },

  plugins: [],
};
