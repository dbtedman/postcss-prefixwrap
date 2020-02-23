import PrefixAssert from "./support/PrefixAssert";
import { postCSSWithPlugin } from "./support/PluginBootstrap";

describe("Acceptance: Replacement Prefixing", () => {
  const postCSS = postCSSWithPlugin();

  it("replaces global selectors with prefix", () => {
    PrefixAssert.actualMatchesExpectedAfterPrefixWrap(
      postCSS,
      `${__dirname}/fixtures/replacement-tags-raw.css`,
      `${__dirname}/fixtures/replacement-tags-expected.css`
    );
  });
});
