import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

/**
 * Flat config. Next 16 removed `next lint`, so ESLint is invoked directly via
 * the `lint` npm script and this replaces the old `.eslintrc.json`.
 */
const config = [
  {
    ignores: [".next/**", "node_modules/**", "public/**", "next-env.d.ts"],
  },
  ...coreWebVitals,
  ...typescript,
  {
    rules: {
      // Unused values are usually a leftover from a refactor; surface them as
      // warnings rather than failing the build, but allow the `_`-prefix escape
      // hatch for deliberately ignored positional arguments.
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_", caughtErrors: "all" },
      ],
    },
  },
];

export default config;
