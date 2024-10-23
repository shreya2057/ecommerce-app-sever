import tsParser from "@typescript-eslint/parser";
import globals from "globals";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,tsx}"],

    rules: {
      "no-undef": "error",
      semi: "error",
      "semi-spacing": "error",
      "no-invalid-this": "error",
      "no-return-assign": "error",
      "no-unused-expressions": ["error", { allowTernary: true }],
      "no-constant-condition": "warn",
      "no-unused-vars": ["error", { argsIgnorePattern: "req|res|next|__" }],
      "no-mixed-spaces-and-tabs": "warn",
      "space-in-parens": "error",
      "space-infix-ops": "error",
      "space-unary-ops": "error",
      "max-len": ["error", { code: 200 }],
      "max-lines": ["error", { max: 500 }],
      "keyword-spacing": "error",
      "no-mixed-operators": "error",
      "no-multiple-empty-lines": ["error", { max: 2, maxEOF: 1 }],
      "no-whitespace-before-property": "error",
      "object-property-newline": [
        "error",
        { allowAllPropertiesOnSameLine: true }
      ],
      "arrow-spacing": "error",
      "no-confusing-arrow": "error",
      "no-duplicate-imports": "error",
      "no-var": "error",
      "prefer-const": "error",
      "prefer-template": "warn"
    },

    ignores: ["dist/**", "node_modules/**", "global.d.ts"],

    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node
      }
    }
  }
];
