/**
 * Design tokens consumed by `tailwind.config.ts`.
 *
 * Kept in TypeScript rather than scattered through components so the type scale,
 * spacing rhythm and measure are decided in one place. Colours stay in
 * `styles/tokens.scss` as CSS custom properties so they are available to plain
 * CSS as well as to Tailwind utilities.
 */

/**
 * Fluid type scale. Each step interpolates between a mobile and a desktop size
 * across the 360px–1280px viewport range, so there are no jumps at breakpoints
 * and no need for per-size responsive variants at call sites.
 */
function fluid(minRem: number, maxRem: number) {
  const minViewport = 22.5; // 360px
  const maxViewport = 80; // 1280px
  const slope = (maxRem - minRem) / (maxViewport - minViewport);
  const intercept = minRem - slope * minViewport;
  return `clamp(${minRem}rem, ${intercept.toFixed(4)}rem + ${(slope * 100).toFixed(4)}vw, ${maxRem}rem)`;
}

type FontSizeEntry = [fontSize: string, config: { lineHeight: string; letterSpacing?: string }];

export const fontSize: Record<string, FontSizeEntry> = {
  "fluid-xs": [fluid(0.75, 0.8125), { lineHeight: "1.5" }],
  "fluid-sm": [fluid(0.8125, 0.875), { lineHeight: "1.5" }],
  "fluid-base": [fluid(1, 1.0625), { lineHeight: "1.65" }],
  "fluid-lg": [fluid(1.0625, 1.25), { lineHeight: "1.55" }],
  "fluid-xl": [fluid(1.25, 1.5), { lineHeight: "1.35" }],
  "fluid-2xl": [fluid(1.5, 2), { lineHeight: "1.2", letterSpacing: "-0.015em" }],
  "fluid-3xl": [fluid(1.875, 2.75), { lineHeight: "1.1", letterSpacing: "-0.02em" }],
  "fluid-4xl": [fluid(2.25, 4), { lineHeight: "1.05", letterSpacing: "-0.03em" }],
};

/**
 * Vertical rhythm for section padding. Sections use one of these rather than
 * ad hoc `py-*` values, which is what kept spacing inconsistent before.
 */
export const sectionSpacing = {
  tight: fluid(3, 4.5),
  default: fluid(4.5, 7.5),
  loose: fluid(6, 10),
} as const;

/**
 * Comfortable reading measure. `prose` is Tailwind's 65ch default; `measure`
 * gives the slightly wider 72ch used for standalone body copy.
 */
export const maxWidth = {
  measure: "72ch",
  "measure-tight": "58ch",
} as const;
