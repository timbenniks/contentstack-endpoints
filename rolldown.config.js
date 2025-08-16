import { defineConfig } from "rolldown";

export default defineConfig([
  // ESM build
  {
    input: "src/index.ts",
    output: {
      file: "dist/esm/index.js",
      format: "esm",
      sourcemap: true,
    },
    external: [], // No external dependencies for this package
  },
  // CJS build
  {
    input: "src/index.ts",
    output: {
      file: "dist/cjs/index.cjs",
      format: "cjs",
      sourcemap: true,
    },
    external: [],
  },
]);
