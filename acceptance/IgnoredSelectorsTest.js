const PostCSS = require("postcss");

const PrefixWrap = require("../build/main");
const PrefixAssert = require("./support/PrefixAssert");

const postCSSIgnore = PostCSS([
  PrefixWrap(".my-container", {
    ignoredSelectors: [":root", "#my-id", /^\.some-(.+)$/]
  })
]);
const fixtures = __dirname + "/fixtures";

describe("Acceptance: Ignored Selectors", () => {
  it("ignores selectors that are in a ignore list", () => {
    PrefixAssert.actualMatchesExpectedAfterPrefixWrap(
      postCSSIgnore,
      fixtures + "/ignore-selectors.css",
      fixtures + "/ignore-selectors-expected.css"
    );
  });
});
