import * as path from "path";
import { assertActualMatchesExpectedAfterPrefixWrap } from "./support/PrefixAssert";
import { postCSSWithPlugin } from "./support/PluginBootstrap";

describe("Acceptance: Leave Our Container", () => {
  const postCSS = postCSSWithPlugin();

  it("leaves selectors that contain our Selector in the left most location", () => {
    assertActualMatchesExpectedAfterPrefixWrap(
      postCSS,
      path.join(__dirname, "fixtures", "leave-raw.css"),
      path.join(__dirname, "fixtures", "leave-expected.css")
    );
  });
});
