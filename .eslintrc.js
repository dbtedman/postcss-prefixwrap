//------------------------------------------------------------------------------
//
// ESLint Configuration
//
// Based on https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/README.md
//
//  - https://www.npmjs.com/package/@typescript-eslint/eslint-plugin
//  - https://www.npmjs.com/package/@typescript-eslint/parser
//  - https://www.npmjs.com/package/eslint-config-prettier
//  - https://www.npmjs.com/package/eslint-plugin-jest
//
//------------------------------------------------------------------------------

module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "jest"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:jest/recommended",
  ],
  rules: {
    // Our tests rely frequently on assertions defined in external file.
    "jest/expect-expect": "off",
  },
  env: {
    browser: true,
    node: true,
  },
};
