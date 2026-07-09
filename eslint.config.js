import path from "node:path";
import { fileURLToPath } from "node:url";

import prettierConfig from "eslint-config-prettier";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import reactPlugin from "eslint-plugin-react";
import hooksPlugin from "eslint-plugin-react-hooks";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import unusedImports from "eslint-plugin-unused-imports";
import globals from "globals";
import tseslint from "typescript-eslint";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default tseslint.config(
  // Global ignore paths (ignores must be in their own config object to act globally)
  {
    ignores: [
      "**/node_modules/**",
      "**/build/**",
      "**/.react-router/**",
      "**/dist/**",
      "**/.cache/**",
      "yarn.lock",
      "vitest.workspace.ts",
    ],
  },
  // 1. Base configs for all JavaScript and TypeScript files
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      react: reactPlugin,
      "react-hooks": hooksPlugin,
      "jsx-a11y": jsxA11yPlugin,
      "simple-import-sort": simpleImportSort,
      "unused-imports": unusedImports,
      "custom-architecture": {
        rules: {
          "prefer-named-exports": {
            meta: {
              type: "suggestion",
              docs: {
                description:
                  "Enforce named exports over default exports to ensure searchability and consistent module naming.",
              },
              schema: [],
            },
            create(context) {
              return {
                ExportDefaultDeclaration(node) {
                  context.report({
                    node,
                    message:
                      "Prefer named exports over default exports. Route layouts, pages, and config files should be marked in ignores or overrides.",
                  });
                },
              };
            },
          },
        },
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      // React rules integration
      ...reactPlugin.configs.recommended.rules,
      ...reactPlugin.configs["jsx-runtime"].rules,

      // React Hooks rules
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // Accessibility rules (Treat accessibility warnings as error gates)
      ...jsxA11yPlugin.configs.recommended.rules,
      "jsx-a11y/alt-text": "error",
      "jsx-a11y/anchor-has-content": "error",
      "jsx-a11y/anchor-is-valid": "error",
      "jsx-a11y/click-events-have-key-events": "error",
      "jsx-a11y/no-noninteractive-element-interactions": "error",
      "jsx-a11y/no-static-element-interactions": "error",

      // Import sorting configuration
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // 1. Node.js built-in modules
            ["^(node:)?(fs|path|os|crypto|stream|url|util|events|http|https)$"],
            // 2. External packages (e.g. react, react-router)
            ["^@?\\w"],
            // 3. Internal workspace packages (e.g. @marketplace/*)
            ["^@marketplace/"],
            // 4. Application aliases (~/* or @/*)
            ["^(~|@)/"],
            // 5. Relative imports
            ["^\\.\\.(?!/?$)", "^\\.\\./?$", "^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
            // 6. Style and asset imports
            ["^.+\\.(css|scss|sass|less|json|svg|png|jpg|jpeg|webp)$"],
          ],
        },
      ],
      "simple-import-sort/exports": "error",

      // Unused imports and variables clean-up
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "error",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],

      // Code quality & quality rules
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "prefer-const": "error",
      "no-var": "error",
    },
  },
  // 2. TypeScript-specific rules & configuration service
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: __dirname,
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
    },
    rules: {
      // TypeScript recommended rules
      ...tseslint.configs.recommended.reduce(
        (acc, config) => ({ ...acc, ...(config.rules || {}) }),
        {},
      ),
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
  // Overrides to allow default exports in framework specific entrypoints and page routes
  {
    files: [
      "apps/marketplace/app/routes/**/*.tsx",
      "apps/marketplace/app/root.tsx",
      "apps/marketplace/app/entry.client.tsx",
      "apps/marketplace/app/entry.server.tsx",
      "apps/marketplace/react-router.config.ts",
      "apps/marketplace/vite.config.ts",
      "apps/marketplace/vitest.config.ts",
      "packages/design-system/vitest.config.ts",
      "eslint.config.js",
    ],
    rules: {
      "custom-architecture/prefer-named-exports": "off",
    },
  },
  // Overrides to enforce named exports in packages and components
  {
    files: ["packages/**/*.{ts,tsx}", "apps/marketplace/app/features/**/*.{ts,tsx}"],
    rules: {
      "custom-architecture/prefer-named-exports": "error",
    },
  },
  // Vitest config files require default exports
  {
    files: ["**/vitest.config.ts"],
    rules: {
      "custom-architecture/prefer-named-exports": "off",
    },
  },
  // Playwright config and E2E specs (no TS project reference)
  {
    files: ["playwright.config.ts", "e2e/**/*.ts"],
    languageOptions: {
      parserOptions: {
        projectService: false,
      },
    },
    rules: {
      "custom-architecture/prefer-named-exports": "off",
    },
  },
  // Prettier formatter override
  prettierConfig,
);
