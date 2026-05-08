import type { Config } from "tailwindcss";
import addVariablesForColors from "./utils/colors";
import addBackgroundDotPattern from "./utils/background";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        "3xl": "1921px",
      },
      backdropBlur: {
        xs: '2px',
      },
      fontFamily: {
        spaceGrotesk: ['space-grotesk', 'sans-serif'],
        matrix: ['matrix', 'sans-serif'],
        quicksand: ['quicksand', 'sans-serif'],
      },
    },
  },
  plugins: [
    addVariablesForColors,
    addBackgroundDotPattern,
  ],
};


export default config;
