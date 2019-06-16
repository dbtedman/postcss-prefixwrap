const PostCSS = require("postcss");

const PrefixWrap = require("../build/main");
const PrefixAssert = require("./support/PrefixAssert");

const postCSS = PostCSS([PrefixWrap(".my-container")]);
const fixtures = __dirname + "/fixtures";

describe("Acceptance: Leave Our Container", () => {
  it("leaves selectors that contain our Selector in the left most location", () => {
    PrefixAssert.actualMatchesExpectedAfterPrefixWrap(
      postCSS,
      fixtures + "/leave-raw.css",
      fixtures + "/leave-expected.css"
    );
  });
});
