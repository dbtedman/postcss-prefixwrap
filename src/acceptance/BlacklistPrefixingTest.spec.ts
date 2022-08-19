import * as path from "path";
import PrefixAssert from "./support/PrefixAssert";
import { postCSSWithPlugin } from "./support/PluginBootstrap";

describe("Acceptance: Blacklist", () => {
  const postCSS = postCSSWithPlugin({
    blacklist: [".*fixtures[\\/]standard-classes-raw.css"],
  });

  it("ignores file in blacklist", () => {
    PrefixAssert.noChangeAfterPrefixWrap(
      postCSS,
      path.join(__dirname, "fixtures", "standard-classes-raw.css")
    );
  });

  it("prefixes non blacklisted file", () => {
    PrefixAssert.actualMatchesExpectedAfterPrefixWrap(
      postCSS,
      path.join(__dirname, "fixtures", "standard-tags-raw.css"),
      path.join(__dirname, "fixtures", "standard-tags-expected.css")
    );
  });
});
