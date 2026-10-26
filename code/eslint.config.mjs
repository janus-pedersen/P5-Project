import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

export default defineConfig({
    files: ['**/*.{js,cjs,mjs,ts,tsx,mts,cts}'],

    extends: [
        js.configs.recommended,
        tseslint.configs.strict,
        tseslint.configs.stylistic,
        prettier
    ],

    languageOptions: {
        ecmaVersion: 'latest',
        globals: {
            ...globals.node,
            ...globals.jest
        }
    }
});
