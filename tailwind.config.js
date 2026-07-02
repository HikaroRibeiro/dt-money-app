/** @type {import('tailwindcss').Config} */

import colors from './src/shared/colors'

module.exports = {
  content: ["./App.tsx", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [
    require("nativewind/preset")
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
      fontSize: {
        sm: '14px',
        base: '16px',
        lg: '18px',
        xl: '20px',
        '2xl': '24px',
        '3xl': '30px',
        '4xl': '36px',
      },
      height: {
        button: 57,
      },
      colors,
    },
  },
  plugins: [],
}


