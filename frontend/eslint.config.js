import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import reactPlugin from 'eslint-plugin-react';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';

const config = [
  { ignores: ['dist'] },
  {
    files: ['**/*.{ts,tsx}'],
  },
  {
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
  ...tseslint.configs.recommended,
  js.configs.recommended,
  {
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
  },
  { ...eslintPluginPrettier },
  { ...reactPlugin.configs.flat.recommended },
  {
    rules: {
      ...reactHooks.configs.recommended.rules,
      'no-unused-vars': ['off'],
      'react-hooks/exhaustive-deps': ['off'],
      'react/react-in-jsx-scope': ['off'],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
];

export default config;
