import PostCSS from "postcss";

import PrefixWrap from "../";
import PrefixAssert from "./support/PrefixAssert";

describe("Acceptance: Leave Keyframe Percentages", () => {
  const postCSS = PostCSS([PrefixWrap(".my-container")]);
  const fixtures = __dirname + "/fixtures";

  it("ignores selectors that are percentages", () => {
    PrefixAssert.actualMatchesExpectedAfterPrefixWrap(
      postCSS,
      fixtures + "/keyframes-raw.css",
      fixtures + "/keyframes-expected.css"
    );
  });
});
