const PostCSS = require("postcss");

const PrefixWrap = require("../src/main");
const PrefixAssert = require("./support/prefix-assert");

const postCSS = PostCSS([PrefixWrap(".my-container")]);
const fixtures = __dirname + "/fixtures";

describe("Leave Our Container", () => {
  it("leaves selectors that contain our selector in the left most location", () => {
    PrefixAssert.actualMatchesExpectedAfterPrefixWrap(
      postCSS,
      fixtures + "/leave-raw.css",
      fixtures + "/leave-expected.css"
    );
  });
});
