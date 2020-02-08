import PrefixAssert from "./support/PrefixAssert";
import { postCSSWithPlugin } from "./support/PluginBootstrap";

describe("Acceptance: Prefix html/body tags", () => {
  const postCSSSkip = postCSSWithPlugin({ prefixRootTags: true });

  it("adds prefix to global selectors", () => {
    PrefixAssert.actualMatchesExpectedAfterPrefixWrap(
      postCSSSkip,
      `${__dirname}/fixtures/leave-body-raw.css`,
      `${__dirname}/fixtures/leave-body-expected.css`
    );
  });
});
