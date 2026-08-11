import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";
import addVariablesForColors from "./utils/colors";
import addBackgroundDotPattern from "./utils/background";
import { fontSize, maxWidth, sectionSpacing } from "./lib/tokens";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{md,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./utils/**/*.{js,ts,jsx,tsx,mdx}",
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
      fontSize: { ...fontSize },
      maxWidth: { ...maxWidth },
      spacing: {
        "section-tight": sectionSpacing.tight,
        section: sectionSpacing.default,
        "section-loose": sectionSpacing.loose,
      },
      fontFamily: {
        // `matrix` and `quicksand` were declared here and as raw @font-face rules
        // but never used by any component, so both are gone along with their .ttf files.
        spaceGrotesk: ['var(--font-space-grotesk)', 'sans-serif'],
        display: ['var(--font-inter-tight)', 'sans-serif'],
      },
      colors: {
        bg: "rgb(var(--bg) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        fg: "rgb(var(--fg) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        accent: {
          DEFAULT: "rgb(var(--accent) / <alpha-value>)",
          strong: "rgb(var(--accent-strong) / <alpha-value>)",
          soft: "rgb(var(--accent-soft) / <alpha-value>)",
        },
      },
      boxShadow: {
        glow: "0 0 80px color-mix(in srgb, rgb(var(--accent)) 24%, transparent)",
      },
    },
  },
  plugins: [
    addVariablesForColors,
    addBackgroundDotPattern,
    tailwindcssAnimate,
  ],
};


export default config;
