import eslintPluginReact from "eslint-plugin-react";
import eslintPluginNext from "@next/eslint-plugin-next";
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
      },
    },
    plugins: {
      react: eslintPluginReact,
      "@typescript-eslint": typescriptEslintPlugin,
      "@next/next": eslintPluginNext,
    },
    rules: {
      ...eslintPluginReact.configs.recommended.rules,
      ...typescriptEslintPlugin.configs.recommended.rules,
      ...eslintPluginNext.configs.recommended.rules,
      "react/react-in-jsx-scope": "off", // React 17+ JSX transform
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    ignores: ["node_modules", ".next", "dist", "build"],
  },
];
