import { postCSSWithPlugin } from "acceptance/support/PluginBootstrap";
import PrefixAssert from "acceptance/support/PrefixAssert";
import path from "path";

describe("Acceptance: Prefix selector with special characters", () => {
  it("handles .my-custom-selector[id^=my-id-starts-with-]", () => {
    const postCSS = postCSSWithPlugin(
      {},
      ".my-custom-selector[id^=my-id-starts-with-]"
    );
    PrefixAssert.actualMatchesExpectedAfterPrefixWrap(
      postCSS,
      path.join(__dirname, "fixtures", "selector-special-characters-raw.css"),
      path.join(
        __dirname,
        "fixtures",
        "selector-special-characters-expected.css"
      )
    );
  });
});
