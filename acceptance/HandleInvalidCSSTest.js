const PostCSS = require("postcss");

const PrefixWrap = require("../src/main");
const PrefixAssert = require("./support/prefix-assert");

const postCSS = PostCSS([PrefixWrap(".my-container")]);
const fixtures = __dirname + "/fixtures";

describe("Handle Invalid CSS", () => {
  it("ignores empty selectors", () => {
    PrefixAssert.actualMatchesExpectedAfterPrefixWrap(
      postCSS,
      fixtures + "/empty-selectors-raw.css",
      fixtures + "/empty-selectors-expected.css"
    );
  });
});
