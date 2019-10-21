import PostCSS from "postcss";

import PrefixWrap from "../";
import PrefixAssert from "./support/PrefixAssert";

describe("Acceptance: Replacement Prefixing", () => {
  const postCSS = PostCSS([PrefixWrap(".my-container")]);
  const fixtures = __dirname + "/fixtures";

  it("replaces global selectors with prefix", () => {
    PrefixAssert.actualMatchesExpectedAfterPrefixWrap(
      postCSS,
      fixtures + "/replacement-tags-raw.css",
      fixtures + "/replacement-tags-expected.css"
    );
  });
});
