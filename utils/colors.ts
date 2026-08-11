import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette";
import type { PluginAPI } from "tailwindcss/types/config";

/**
 * Exposes every Tailwind colour as a global CSS variable, e.g. `var(--gray-200)`.
 *
 * Only the legacy `ui/*` components rely on this. New work should use the
 * semantic tokens (`--bg`, `--fg`, `--muted`, `--accent`) from styles/tokens.scss
 * so the accent switcher actually affects them.
 */
export default function addVariablesForColors({ addBase, theme }: PluginAPI) {
  const allColors = flattenColorPalette(theme("colors"));
  const newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, value]) => [`--${key}`, value]),
  );

  addBase({ ":root": newVars });
}
