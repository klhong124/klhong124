/**
 * Tailwind 3 ships this helper without types. Declared here so the two custom
 * plugins in utils/ can stay strict rather than reaching for `any`.
 */
declare module "tailwindcss/lib/util/flattenColorPalette" {
  const flattenColorPalette: (colors: unknown) => Record<string, string>;
  export default flattenColorPalette;
}
