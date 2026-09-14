import { defineConfig } from "oxlint"

export default defineConfig({
  plugins: ["unicorn", "typescript", "oxc", "vitest", "promise"],
  categories: {
    correctness: "deny",
    suspicious: "warn",
    perf: "warn",
    pedantic: "warn",
  },
  rules: {
    curly: "error",
    "sort-imports": ["warn", { ignoreCase: true, ignoreDeclarationSort: true }],
    "no-inline-comments": "allow",
    "require-unicode-regexp": "allow",
    "max-lines-per-function": "allow",
    "max-lines": "allow",
    "unicorn/consistent-function-scoping": "allow",
    "vitest/no-conditional-in-test": "allow",
    "vitest/require-to-throw-message": "allow",
    "typescript/no-explicit-any": "error",
    "typescript/no-unnecessary-condition": "error",
    "typescript/prefer-readonly-parameter-types": "allow",
    "typescript/strict-boolean-expressions": "allow",
    "typescript/consistent-type-definitions": ["warn", "type"],
    "typescript/consistent-type-imports": [
      "error",
      { prefer: "type-imports", fixStyle: "inline-type-imports" },
    ],
    "no-unused-vars": [
      "warn",
      { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
    ],
  },
  ignorePatterns: ["dist"],
})
