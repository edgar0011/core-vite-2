import js from '@eslint/js'
import { defineConfig, globalIgnores } from 'eslint/config'
import prettierConfig from 'eslint-config-prettier'
import importPlugin from 'eslint-plugin-import'
import prettier from 'eslint-plugin-prettier'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import storybook from 'eslint-plugin-storybook'
import unusedImports from 'eslint-plugin-unused-imports'
import globals from 'globals'
import tseslint from 'typescript-eslint'
// Note: 'eslint-plugin-graet' is a custom plugin - uncomment and install if available
// import graet from 'eslint-plugin-graet'

export default defineConfig([
  // Global ignores
  globalIgnores(['dist', 'node_modules', '.next', 'infra', 'next-env.d.ts']),

  // Base config for all TypeScript/JavaScript files
  {
    files: ['**/*.{ts,tsx,js}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      prettierConfig,
    ],
    plugins: {
      react,
      prettier,
      'simple-import-sort': simpleImportSort,
      'unused-imports': unusedImports,
      import: importPlugin,
    },
    languageOptions: {
      ecmaVersion: 2024,
      globals: {
        ...globals.browser,
        ...globals.es6,
        ...globals.vitest,
        ...globals.node,
        NodeJS: 'writable',
        React: 'writable',
        vi: 'readonly',
      },
    },
    rules: {
      curly: 1,
      'import/no-extraneous-dependencies': ['error'],
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'react',
              importNames: ['default'],
              message: 'Do not use default imports from React. Use named imports instead.',
            },
          ],
        },
      ],
      'no-undef': 'error',
      'prettier/prettier': ['error', { endOfLine: 'auto' }, { usePrettierrc: true }],
      'react/jsx-curly-brace-presence': ['warn', { props: 'never' }],
      semi: ['error', 'never'],
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': 'error',
      'unused-imports/no-unused-imports': 'error',
    },
  },

  // Storybook recommended config
  ...storybook.configs['flat/recommended'],

  // Override for src files
  {
    files: ['src/**/*.tsx', 'src/**/*.js', 'src/**/*.ts'],
    rules: {
      '@typescript-eslint/no-this-alias': 'off',
      'react-hooks/rules-of-hooks': 'warn',
      'react-hooks/exhaustive-deps': 'warn',
      'react/jsx-no-undef': 'error',
    },
  },
])
