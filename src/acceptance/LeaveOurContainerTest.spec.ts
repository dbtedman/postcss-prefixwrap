import * as path from "path";
import PrefixAssert from "./support/PrefixAssert";
import { postCSSWithPlugin } from "./support/PluginBootstrap";

describe("Acceptance: Leave Our Container", () => {
  const postCSS = postCSSWithPlugin();

  it("leaves selectors that contain our Selector in the left most location", () => {
    PrefixAssert.actualMatchesExpectedAfterPrefixWrap(
      postCSS,
      path.join(__dirname, "fixtures", "..", "leave-raw.css"),
      path.join(__dirname, "fixtures", "..", "leave-expected.css")
    );
  });
});
