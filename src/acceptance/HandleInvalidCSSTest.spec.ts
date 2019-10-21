import PostCSS from "postcss";

import PrefixWrap from "../";
import PrefixAssert from "./support/PrefixAssert";

describe("Acceptance: Handle Invalid CSS", () => {
  const postCSS = PostCSS([PrefixWrap(".my-container")]);
  const fixtures = __dirname + "/fixtures";

  it("ignores empty selectors", () => {
    PrefixAssert.actualMatchesExpectedAfterPrefixWrap(
      postCSS,
      fixtures + "/empty-selectors-raw.css",
      fixtures + "/empty-selectors-expected.css"
    );
  });
});
