const PostCSS = require("postcss");

const PrefixWrap = require("../src/main");
const PrefixAssert = require("./support/PrefixAssert");

const postCSS = PostCSS([PrefixWrap(".my-container")]);
const fixtures = __dirname + "/fixtures";

describe("Acceptance: Leave Keyframe Percentages", () => {
  it("ignores selectors that are percentages", () => {
    PrefixAssert.actualMatchesExpectedAfterPrefixWrap(
      postCSS,
      fixtures + "/keyframes-raw.css",
      fixtures + "/keyframes-expected.css"
    );
  });
});
