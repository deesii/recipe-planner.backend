import globals from 'globals';
import pluginJs from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
  { languageOptions: { globals: globals.node } },
  eslintConfigPrettier,
  pluginJs.configs.recommended,
  {
    rules: {
      // Custom rules go here
      'no-console': 'off', // Allow console statements (useful for backend logging)
      semi: ['error', 'always'], // Require semicolons at the end of statements
      quotes: ['error', 'single'], // Enforce the use of single quotes
      indent: ['error', 2], // Enforce consistent indentation (2 spaces)
      'no-unused-vars': ['warn'], // Warn about variables that are declared but not used
      eqeqeq: ['error', 'always'], // Require the use of === and !==
      curly: ['error', 'all'], // Require curly braces for all control statements
    },
  },
];
