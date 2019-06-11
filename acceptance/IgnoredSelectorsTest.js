const PostCSS = require("postcss");

const PrefixWrap = require("../src/main");
const PrefixAssert = require("./support/prefix-assert");

const postCSSIgnore = PostCSS([
  PrefixWrap(".my-container", {
    ignoredSelectors: [":root", "#my-id", /^\.some-(.+)$/]
  })
]);
const fixtures = __dirname + "/fixtures";

describe("Ignored Selectors", () => {
  it("ignores selectors that are in a ignore list", () => {
    PrefixAssert.actualMatchesExpectedAfterPrefixWrap(
      postCSSIgnore,
      fixtures + "/ignore-selectors.css",
      fixtures + "/ignore-selectors-expected.css"
    );
  });
});
