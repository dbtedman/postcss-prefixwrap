import PrefixAssert from "./support/PrefixAssert";
import { postCSSWithPlugin } from "./support/PluginBootstrap";

describe("Acceptance: Leave Keyframe Percentages", () => {
  const postCSS = postCSSWithPlugin();

  it("ignores selectors that are percentages", () => {
    PrefixAssert.actualMatchesExpectedAfterPrefixWrap(
      postCSS,
      `${__dirname}/fixtures/keyframes-raw.css`,
      `${__dirname}/fixtures/keyframes-expected.css`
    );
  });
});
