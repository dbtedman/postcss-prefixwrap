module.exports = {
  hooks: {
    "pre-commit": "yarn format && yarn test",
  },
};
