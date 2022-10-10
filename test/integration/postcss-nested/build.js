const source = ".demo { &--lite { color:red; } }";
const expected = ".my-selector .demo--lite { color:red; }";

const result = require("postcss")([
  require("postcss-nested"),
  require("postcss-prefixwrap")(".my-selector", { nested: "&" }),
]).process(source);

// postcss-prefixwrap and postcss-nested play well together (#154)
if (result.css !== expected) {
  console.error(`[${result.css}] did not match expected [${expected}]`);
  process.exit(1);
}
