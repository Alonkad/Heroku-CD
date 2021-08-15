module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module' // Allows for the use of imports
  },
  env: {
    browser: true,
    es6: true
  },
  extends: [
    'standard',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:promise/recommended'
  ],
  plugins: ['prettier', '@typescript-eslint', 'jest'],
  settings: {
    'import/resolver': {
      'eslint-import-resolver-typescript': true,
      typescript: {
        alwaysTryTypes: true // always try to resolve types under `<roo/>@types` directory even it doesn't contain any source code, like `@types/unist`
      }
    }
  },
  overrides: [
    {
      files: ['**/*.test.js'],
      env: {
        jest: true // now **/*.test.js files' env has both es6 *and* jest
      },
      plugins: ['jest'],
      rules: {
        'jest/no-disabled-tests': 'warn',
        'jest/no-focused-tests': 'error',
        'jest/no-identical-title': 'error',
        'jest/prefer-to-have-length': 'warn',
        'jest/valid-expect': 'error'
      }
    }
  ],
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
  }
}
