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
      },
      ecmaFeatures: {
        jsx: true,
      },
    },
    plugins: {
      react: eslintPluginReact,
      "@typescript-eslint": typescriptEslintPlugin,
    },
    rules: {
      ...eslintPluginReact.configs.recommended.rules,
      ...typescriptEslintPlugin.configs.recommended.rules,

      "react/react-in-jsx-scope": "off", // React 17+ JSX transform
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
