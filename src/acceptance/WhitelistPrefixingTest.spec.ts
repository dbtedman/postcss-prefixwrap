import PrefixAssert from "./support/PrefixAssert";
import { postCSSWithPlugin } from "./support/PluginBootstrap";

describe("Acceptance: Whitelist", () => {
  const postCSS = postCSSWithPlugin({
    whitelist: [`${__dirname}/fixtures/standard-tags-raw.css`]
  });

  it("ignores file not whitelisted", () => {
    PrefixAssert.noChangeAfterPrefixWrap(
      postCSS,
      `${__dirname}/fixtures/standard-classes-raw.css`
    );
  });

  it("prefixes whitelisted file", () => {
    PrefixAssert.actualMatchesExpectedAfterPrefixWrap(
      postCSS,
      `${__dirname}/fixtures/standard-tags-raw.css`,
      `${__dirname}/fixtures/standard-tags-expected.css`
    );
  });
});
