import flowbitePlugin from 'flowbite/plugin'
const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        'greenishBlueLight': '#47d8e0',
        'greenishBlueDark': '#50c7cd',
        'greenishBlueWhite': '#91f0ff',
        'primary': "#ECEEFF",
        // 'primary': "#101010",
        "coral-red": "#FF6452",
        "slate-gray": "#6D6D6D",
        "pale-blue": "#F5F6FF",
        "white-400": "rgba(255, 255, 255, 0.80)"
      },
      boxShadow: {
        '3xl': '0 10px 40px rgba(0, 0, 0, 0.1)'
      },
      fontFamily: {
        palanquin: ['Palanquin', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [flowbitePlugin,
    require('tailwindcss-no-scrollbar'),
  ],
}