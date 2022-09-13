import * as path from "path";
import { assertActualMatchesExpectedAfterPrefixWrap } from "./support/PrefixAssert";
import { postCSSWithPlugin } from "./support/PluginBootstrap";

describe("Acceptance: Handle Invalid CSS", () => {
  const postCSS = postCSSWithPlugin();

  it("ignores empty selectors", () => {
    assertActualMatchesExpectedAfterPrefixWrap(
      postCSS,
      path.join(__dirname, "fixtures", "empty-selectors-raw.css"),
      path.join(__dirname, "fixtures", "empty-selectors-expected.css")
    );
  });
});
