import PrefixAssert from "./support/PrefixAssert";
import { postCSSWithPlugin } from "./support/PluginBootstrap";

describe("Acceptance: Standard Prefixing", () => {
  const postCSS = postCSSWithPlugin();

  it("adds prefix class for tags", () => {
    PrefixAssert.actualMatchesExpectedAfterPrefixWrap(
      postCSS,
      `${__dirname}/fixtures/standard-tags-raw.css`,
      `${__dirname}/fixtures/standard-tags-expected.css`
    );
  });

  it("adds prefix class for ids", () => {
    PrefixAssert.actualMatchesExpectedAfterPrefixWrap(
      postCSS,
      `${__dirname}/fixtures/standard-ids-raw.css`,
      `${__dirname}/fixtures/standard-ids-expected.css`
    );
  });

  it("adds prefix class for classes", () => {
    PrefixAssert.actualMatchesExpectedAfterPrefixWrap(
      postCSS,
      `${__dirname}/fixtures/standard-classes-raw.css`,
      `${__dirname}/fixtures/standard-classes-expected.css`
    );
  });

  it("adds prefix class for multiple classes", () => {
    PrefixAssert.actualMatchesExpectedAfterPrefixWrap(
      postCSS,
      `${__dirname}/fixtures/multiple-classes-raw.css`,
      `${__dirname}/fixtures/multiple-classes-expected.css`
    );
  });

  // @see https://developer.mozilla.org/en-US/docs/Web/CSS/Universal_selectors)
  it("adds prefix class for universal selectors", () => {
    PrefixAssert.actualMatchesExpectedAfterPrefixWrap(
      postCSS,
      `${__dirname}/fixtures/standard-universal-selectors-raw.css`,
      `${__dirname}/fixtures/standard-universal-selectors-expected.css`
    );
  });

  // @see https://developer.mozilla.org/en-US/docs/Web/CSS/Attribute_selectors
  it("adds prefix class for attribute selectors", () => {
    PrefixAssert.actualMatchesExpectedAfterPrefixWrap(
      postCSS,
      `${__dirname}/fixtures/standard-attribute-selectors-raw.css`,
      `${__dirname}/fixtures/standard-attribute-selectors-expected.css`
    );
  });
});
