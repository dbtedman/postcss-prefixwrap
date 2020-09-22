module.exports = {
  hooks: {
    "pre-commit": "yarn lint && yarn test",
  },
};
