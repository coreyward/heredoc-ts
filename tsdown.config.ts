import { defineConfig } from "tsdown"

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: { sourcemap: true },
  clean: true,
  sourcemap: true,
  minify: false,
  target: "es2023",
  fixedExtension: false,
})
