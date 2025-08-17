// TSDown handles both bundling and declarations for libraries
export default {
  entry: "src/index.ts",
  outDir: "dist",
  format: ["esm", "cjs"], // Outputs both ES modules and CommonJS
  dts: true, // Generate TypeScript declarations
  sourcemap: true,
  external: [], // No external dependencies for this package
  clean: true,
};
