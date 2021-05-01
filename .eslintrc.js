module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "jest", "security-node", "promise"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:jest/recommended",
    "plugin:security-node/recommended",
    "plugin:promise/recommended",
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
