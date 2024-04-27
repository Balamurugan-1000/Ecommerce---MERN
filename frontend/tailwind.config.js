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

      }
    },
  },
  plugins: [flowbitePlugin,
    require('tailwindcss-no-scrollbar'),
  ],
}