import * as path from "path";
import PrefixAssert from "./support/PrefixAssert";
import { postCSSWithPlugin } from "./support/PluginBootstrap";

describe("Acceptance: Whitelist", () => {
  const postCSS = postCSSWithPlugin({
    whitelist: [
      path.join(__dirname, "fixtures", "..", "standard-tags-raw.css"),
    ],
  });

  it("ignores file not whitelisted", () => {
    PrefixAssert.noChangeAfterPrefixWrap(
      postCSS,
      path.join(__dirname, "fixtures", "..", "standard-classes-raw.css")
    );
  });

  it("prefixes whitelisted file", () => {
    PrefixAssert.actualMatchesExpectedAfterPrefixWrap(
      postCSS,
      path.join(__dirname, "fixtures", "..", "standard-tags-raw.css"),
      path.join(__dirname, "fixtures", "..", "standard-tags-expected.css")
    );
  });
});
