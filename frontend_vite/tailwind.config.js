/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        darkslate: "#131b2e",
        midslate: "#1d2a3b",
      },
    },
  },
  plugins: [require("daisyui")],
};
