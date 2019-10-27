//------------------------------------------------------------------------------
//
// Husky Configuration, https://github.com/typicode/husky
//
//------------------------------------------------------------------------------

module.exports = {
  hooks: {
    "pre-commit": "yarn lint && yarn test"
  }
};
