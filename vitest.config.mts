import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    // Resolves the "@/*" path alias from tsconfig.json.
    tsconfigPaths: true,
  },
  test: {
    environment: "node",
    include: ["**/*.test.ts"],
    exclude: ["node_modules", ".next"],
  },
});
