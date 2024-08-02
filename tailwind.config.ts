import type { Config } from "tailwindcss";
import addVariablesForColors from "./utils/colors";
import addBackgroundDotPattern from "./utils/background";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        spaceGrotesk: ['SpaceGrotesk', 'sans-serif'],
      },
    },
  },
  plugins: [
    addVariablesForColors,
    addBackgroundDotPattern,
  ],
};


export default config;
