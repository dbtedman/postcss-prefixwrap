const PostCSS = require("postcss");

const PrefixWrap = require("../build/main");
const PrefixAssert = require("./support/PrefixAssert");

const postCSSSkip = PostCSS([
  PrefixWrap(".my-container", { prefixRootTags: true })
]);

const fixtures = __dirname + "/fixtures";

describe("Acceptance: Prefix html/body tags", () => {
  it("adds prefix to global selectors", () => {
    PrefixAssert.actualMatchesExpectedAfterPrefixWrap(
      postCSSSkip,
      fixtures + "/leave-body-raw.css",
      fixtures + "/leave-body-expected.css"
    );
  });
});
