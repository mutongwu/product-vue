const path = require('path');

module.exports = {
  extends: [
    'plugin:vue/recommended'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@babel/eslint-parser',
    allowImportExportEverywhere: true,
    ecmaVersion: 8,
    sourceType: 'module',
    babelOptions: {
      configFile: path.resolve(__dirname, './babel.config.js'),
    },
  },
  rules: {
    'no-underscore-dangle': 'off',
    'vue/max-attributes-per-line': [
      'warn',
      {
        singleline: {
          max: 2,
        },
        multiline: {
          max: 1,
        },
      },
    ],
  },
};
