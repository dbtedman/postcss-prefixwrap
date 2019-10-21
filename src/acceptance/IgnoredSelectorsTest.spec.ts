import PostCSS from "postcss";

import PrefixWrap from "../";
import PrefixAssert from "./support/PrefixAssert";

describe("Acceptance: Ignored Selectors", () => {
  const postCSSIgnore = PostCSS([
    // @ts-ignore
    PrefixWrap(".my-container", {
      ignoredSelectors: [":root", "#my-id", /^\.some-(.+)$/]
    })
  ]);
  const fixtures = __dirname + "/fixtures";

  it("ignores selectors that are in a ignore list", () => {
    PrefixAssert.actualMatchesExpectedAfterPrefixWrap(
      postCSSIgnore,
      fixtures + "/ignore-selectors.css",
      fixtures + "/ignore-selectors-expected.css"
    );
  });
});
