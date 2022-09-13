import * as path from "path";
import {
  assertActualMatchesExpectedAfterPrefixWrap,
  assertNoChangeAfterPrefixWrap,
} from "./support/PrefixAssert";
import { postCSSWithPlugin } from "./support/PluginBootstrap";

describe("Acceptance: Whitelist", () => {
  const postCSS = postCSSWithPlugin({
    whitelist: ["standard-tags-raw.css"],
  });

  it("ignores file not whitelisted", () => {
    assertNoChangeAfterPrefixWrap(
      postCSS,
      path.join(__dirname, "fixtures", "standard-classes-raw.css")
    );
  });

  it("prefixes whitelisted file", () => {
    assertActualMatchesExpectedAfterPrefixWrap(
      postCSS,
      path.join(__dirname, "fixtures", "standard-tags-raw.css"),
      path.join(__dirname, "fixtures", "standard-tags-expected.css")
    );
  });
});
