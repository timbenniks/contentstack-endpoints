// TSDown handles both bundling and declarations for libraries
export default {
  entry: "src/index.ts",
  format: ["esm", "cjs"], // Default is only "esm", we want both
  dts: true, // Generate TypeScript declarations
};
