import * as path from "path";
import PrefixAssert from "./support/PrefixAssert";
import { postCSSWithPlugin } from "./support/PluginBootstrap";

describe("Acceptance: Replacement Prefixing", () => {
  const postCSS = postCSSWithPlugin();

  it("replaces global selectors with prefix", () => {
    PrefixAssert.actualMatchesExpectedAfterPrefixWrap(
      postCSS,
      path.join(__dirname, "fixtures", "replacement-tags-raw.css"),
      path.join(__dirname, "fixtures", "replacement-tags-expected.css")
    );
  });
});
