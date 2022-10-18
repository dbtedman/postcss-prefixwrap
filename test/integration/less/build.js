const fs = require("fs");
const path = require("path");

const source = fs.readFileSync(path.join(__dirname, "compiled.css"), {
  encoding: "utf8",
});
const expected =
  ".my-custom-wrap > :not(.something) .Something .other {\n" +
  "  width: 100%;\n" +
  "}\n";

const result = require("postcss")([
  require("postcss-prefixwrap")(".my-custom-wrap > :not(.something)"),
]).process(source);

if (result.css !== expected) {
  console.error(`[${result.css}] did not match expected [${expected}]`);
  process.exit(1);
}
