import PostCSS from "postcss";

import PrefixWrap from "../";
import PrefixAssert from "./support/PrefixAssert";

describe("Acceptance: Prefix html/body tags", () => {
  const postCSSSkip = PostCSS([
    // @ts-ignore
    PrefixWrap(".my-container", { prefixRootTags: true })
  ]);
  const fixtures = __dirname + "/fixtures";

  it("adds prefix to global selectors", () => {
    PrefixAssert.actualMatchesExpectedAfterPrefixWrap(
      postCSSSkip,
      fixtures + "/leave-body-raw.css",
      fixtures + "/leave-body-expected.css"
    );
  });
});
