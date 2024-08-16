/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
import { forest } from 'daisyui/src/theming/themes';


export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      
    },
    extend: {},
  },
  daisyui: {
    themes: [
    {
        forest: {
          ...forest,
          primary: "#66FCF1",
          accent:"#45A29E",
        neutral: "#66FCF1",
        "--btn-focus-scale": "0.85",
        }
    },
      "cupcake",
    ],
  },
  plugins: [daisyui],
}

