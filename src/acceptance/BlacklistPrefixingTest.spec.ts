import PostCSS from "postcss";

import PrefixWrap from "../";
import PrefixAssert from "./support/PrefixAssert";

describe("Acceptance: Blacklist", () => {
  const fixtures = __dirname + "/fixtures";
  // Generate a postcss instance with our plugin enabled.
  const postCSS = PostCSS([
    // @ts-ignore
    PrefixWrap(".my-container", {
      blacklist: [fixtures + "/standard-classes-raw.css"]
    })
  ]);

  it("ignores file in blacklist", () => {
    PrefixAssert.noChangeAfterPrefixWrap(
      postCSS,
      fixtures + "/standard-classes-raw.css"
    );
  });

  it("prefixes non blacklisted file", () => {
    PrefixAssert.actualMatchesExpectedAfterPrefixWrap(
      postCSS,
      fixtures + "/standard-tags-raw.css",
      fixtures + "/standard-tags-expected.css"
    );
  });
});
