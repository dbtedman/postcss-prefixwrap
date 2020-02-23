import PrefixAssert from "./support/PrefixAssert";
import { postCSSWithPlugin } from "./support/PluginBootstrap";

describe("Acceptance: Blacklist", () => {
  const postCSS = postCSSWithPlugin({
    blacklist: [`${__dirname}/fixtures/standard-classes-raw.css`]
  });

  it("ignores file in blacklist", () => {
    PrefixAssert.noChangeAfterPrefixWrap(
      postCSS,
      `${__dirname}/fixtures/standard-classes-raw.css`
    );
  });

  it("prefixes non blacklisted file", () => {
    PrefixAssert.actualMatchesExpectedAfterPrefixWrap(
      postCSS,
      `${__dirname}/fixtures/standard-tags-raw.css`,
      `${__dirname}/fixtures/standard-tags-expected.css`
    );
  });
});
