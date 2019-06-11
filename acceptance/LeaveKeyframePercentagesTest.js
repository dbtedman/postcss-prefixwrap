const PostCSS = require("postcss");

const PrefixWrap = require("../src/main");
const PrefixAssert = require("./support/prefix-assert");

const postCSS = PostCSS([PrefixWrap(".my-container")]);
const fixtures = __dirname + "/fixtures";

describe("Leave Keyframe Percentages", () => {
  it("ignores selectors that are percentages", () => {
    PrefixAssert.actualMatchesExpectedAfterPrefixWrap(
      postCSS,
      fixtures + "/keyframes-raw.css",
      fixtures + "/keyframes-expected.css"
    );
  });
});
