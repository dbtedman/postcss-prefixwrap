const PostCSS = require("postcss");

const PrefixWrap = require("../src/main");
const PrefixAssert = require("./support/PrefixAssert");

const postCSS = PostCSS([PrefixWrap(".my-container")]);
const fixtures = __dirname + "/fixtures";

describe("Replacement Prefixing", () => {
  it("replaces global selectors with prefix", () => {
    PrefixAssert.actualMatchesExpectedAfterPrefixWrap(
      postCSS,
      fixtures + "/replacement-tags-raw.css",
      fixtures + "/replacement-tags-expected.css"
    );
  });
});
