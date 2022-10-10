const source = "p { color: red; }";
const expected = ".my-selector p { color: red; }";

const result = require("postcss")([
  require("postcss-prefixwrap")(".my-selector"),
]).process(source);

if (result.css !== expected) {
  console.error(`[${result.css}] did not match expected [${expected}]`);
  process.exit(1);
}
