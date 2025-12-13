import { FlatCompat } from '@eslint/eslintrc';
import pluginJs from '@eslint/js';
import globals from 'globals';
import path from 'path';
import { fileURLToPath } from 'url';
import eslintConfigPrettier from "eslint-config-prettier/flat";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
 
const compat = new FlatCompat({
  baseDirectory: __dirname,
});
 
export default [
  pluginJs.configs.recommended,
  ...compat.extends('airbnb-base'),
  { languageOptions: { globals: globals.browser, ecmaVersion: 'latest' } },
  eslintConfigPrettier,
];