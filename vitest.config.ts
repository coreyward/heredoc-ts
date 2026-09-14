import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    clearMocks: true,
    include: ["src/**/*.{test,spec}.{js,ts}"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      include: ["src/**/*.ts"],
      exclude: ["**/*.test.ts", "**/index.ts"],
    },
  },
})
