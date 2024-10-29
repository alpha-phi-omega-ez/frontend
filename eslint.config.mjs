import eslintPluginReact from "eslint-plugin-react";
import typescriptEslintParser from "@typescript-eslint/parser";
import typescriptEslintPlugin from "@typescript-eslint/eslint-plugin";

export default [
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: typescriptEslintParser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
        jsx: true,
      },
    },
    plugins: {
      react: eslintPluginReact,
      "@typescript-eslint": typescriptEslintPlugin,
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      // Add TypeScript-specific rules here if needed
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
