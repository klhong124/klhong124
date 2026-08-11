import svgToDataUri from "mini-svg-data-uri";
import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette";
import type { PluginAPI } from "tailwindcss/types/config";

const dotSvg = (value: string, radius: number) => `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="18" height="18" fill="none">
    <circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="${radius}"></circle>
  </svg>
`;

/** Adds `bg-dot-*` utilities that take a colour, e.g. `bg-dot-white/10`. */
export default function addBackgroundDotPattern({ matchUtilities, theme }: PluginAPI) {
  matchUtilities(
    {
      "bg-dot-thick": (value: string) => ({
        backgroundImage: `url("${svgToDataUri(dotSvg(value, 2.5))}")`,
      }),
      "bg-dot": (value: string) => ({
        backgroundImage: `url("${svgToDataUri(dotSvg(value, 3))}")`,
      }),
    },
    { values: flattenColorPalette(theme("backgroundColor")), type: "color" },
  );
}
