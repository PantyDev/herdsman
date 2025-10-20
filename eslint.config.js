import js from "@eslint/js";
import ts from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import pluginImport from "eslint-plugin-import";
import pluginPrettier from "eslint-plugin-prettier";

import prettierConfig from "./.prettierrc.js";

export default [
	{
		...js.configs.recommended,
		files: ["**/*.{ts,tsx,js,jsx}"],
		ignores: ["dist/**/*", "node_modules/**/*"],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				sourceType: "module",
				ecmaVersion: "latest",
				project: "./tsconfig.eslint.json",
			},
			globals: {
				document: "readonly",
				window: "readonly",
				console: "readonly",
				setTimeout: "readonly",
				clearTimeout: "readonly",
				requestAnimationFrame: "readonly",
			},
		},
		plugins: {
			import: pluginImport,
			prettier: pluginPrettier,
			"@typescript-eslint": ts,
		},
		rules: {
			quotes: ["error", "double"],
			semi: ["error", "always"],
			"no-unused-vars": "off",
			"@typescript-eslint/no-unused-vars": [
				"warn",
				{
					vars: "all",
					args: "after-used",
					argsIgnorePattern: "^_",
					varsIgnorePattern: "^_",
					caughtErrors: "none",
				},
			],
			"prettier/prettier": ["error", prettierConfig],
			"import/order": [
				"error",
				{
					groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
					alphabetize: { order: "asc", caseInsensitive: true },
					"newlines-between": "always",
				},
			],
		},
	},
];
