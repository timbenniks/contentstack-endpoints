import { defineConfig } from "vite-plus";

export default defineConfig({
  staged: {
    "*": "vp check --fix",
  },
  pack: {
    entry: "src/index.ts",
    format: ["esm", "cjs"],
    dts: true,
  },
  lint: {
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
});
