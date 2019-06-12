const PostCSS = require("postcss");

const PrefixWrap = require("../src/main");
const PrefixAssert = require("./support/PrefixAssert");

const postCSS = PostCSS([PrefixWrap(".my-container")]);
const fixtures = __dirname + "/fixtures";

describe("Acceptance: Handle Invalid CSS", () => {
  it("ignores empty selectors", () => {
    PrefixAssert.actualMatchesExpectedAfterPrefixWrap(
      postCSS,
      fixtures + "/empty-selectors-raw.css",
      fixtures + "/empty-selectors-expected.css"
    );
  });
});
