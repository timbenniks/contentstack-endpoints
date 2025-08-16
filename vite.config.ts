import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    dts({
      outDir: 'dist/types',
      insertTypesEntry: false,
      copyDtsFiles: false,
      include: ['src/**/*'],
      exclude: ['**/*.test.ts']
    })
  ],
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es', 'cjs'],
      fileName: (format) => format === 'es' ? 'esm/index.js' : 'cjs/index.cjs'
    },
    outDir: 'dist',
    sourcemap: true,
    minify: false, // Don't minify library output
    target: 'esnext', // Use modern syntax
    rollupOptions: {
      external: [], // No external dependencies
      output: {
        preserveModules: false,
        // Ensure clean, readable output for libraries
        compact: false,
        // Keep meaningful variable names
        manualChunks: undefined
      }
    }
  }
})
