import PostCSS from "postcss";

import PrefixWrap from "../";
import PrefixAssert from "./support/PrefixAssert";

describe("Acceptance: Whitelist", () => {
  const fixtures = __dirname + "/fixtures";
  // Generate a postcss instance with our plugin enabled.
  const postCSS = PostCSS([
    // @ts-ignore
    PrefixWrap(".my-container", {
      whitelist: [fixtures + "/standard-tags-raw.css"]
    })
  ]);

  it("ignores file not whitelisted", () => {
    PrefixAssert.noChangeAfterPrefixWrap(
      postCSS,
      fixtures + "/standard-classes-raw.css"
    );
  });

  it("prefixes whitelisted file", () => {
    PrefixAssert.actualMatchesExpectedAfterPrefixWrap(
      postCSS,
      fixtures + "/standard-tags-raw.css",
      fixtures + "/standard-tags-expected.css"
    );
  });
});
