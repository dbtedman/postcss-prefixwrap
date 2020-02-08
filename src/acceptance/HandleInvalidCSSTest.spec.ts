import PrefixAssert from "./support/PrefixAssert";
import { postCSSWithPlugin } from "./support/PluginBootstrap";

describe("Acceptance: Handle Invalid CSS", () => {
  const postCSS = postCSSWithPlugin();

  it("ignores empty selectors", () => {
    PrefixAssert.actualMatchesExpectedAfterPrefixWrap(
      postCSS,
      `${__dirname}/fixtures/empty-selectors-raw.css`,
      `${__dirname}/fixtures/empty-selectors-expected.css`
    );
  });
});
