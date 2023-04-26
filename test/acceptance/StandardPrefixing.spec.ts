import * as path from "path";

import { describe, it } from "@jest/globals";

import { assertActualMatchesExpectedAfterPrefixWrap } from "./support/PrefixAssert";
import { postCSSWithPlugin } from "./support/PluginBootstrap";

describe("Acceptance: Standard Prefixing", () => {
  const postCSS = postCSSWithPlugin();

  it("adds prefix class for tags", () => {
    assertActualMatchesExpectedAfterPrefixWrap(
      postCSS,
      path.join(__dirname, "fixtures", "standard-tags-raw.css"),
      path.join(__dirname, "fixtures", "standard-tags-expected.css")
    );
  });

  it("adds prefix class for ids", () => {
    assertActualMatchesExpectedAfterPrefixWrap(
      postCSS,
      path.join(__dirname, "fixtures", "standard-ids-raw.css"),
      path.join(__dirname, "fixtures", "standard-ids-expected.css")
    );
  });

  it("adds prefix class for classes", () => {
    assertActualMatchesExpectedAfterPrefixWrap(
      postCSS,
      path.join(__dirname, "fixtures", "standard-classes-raw.css"),
      path.join(__dirname, "fixtures", "standard-classes-expected.css")
    );
  });

  it("adds prefix class for multiple classes", () => {
    assertActualMatchesExpectedAfterPrefixWrap(
      postCSS,
      path.join(__dirname, "fixtures", "multiple-classes-raw.css"),
      path.join(__dirname, "fixtures", "multiple-classes-expected.css")
    );
  });

  // @see https://developer.mozilla.org/en-US/docs/Web/CSS/Universal_selectors)
  it("adds prefix class for universal selectors", () => {
    assertActualMatchesExpectedAfterPrefixWrap(
      postCSS,
      path.join(__dirname, "fixtures", "standard-universal-selectors-raw.css"),
      path.join(
        __dirname,
        "fixtures",
        "standard-universal-selectors-expected.css"
      )
    );
  });

  // @see https://developer.mozilla.org/en-US/docs/Web/CSS/Attribute_selectors
  it("adds prefix class for attribute selectors", () => {
    assertActualMatchesExpectedAfterPrefixWrap(
      postCSS,
      path.join(__dirname, "fixtures", "standard-attribute-selectors-raw.css"),
      path.join(
        __dirname,
        "fixtures",
        "standard-attribute-selectors-expected.css"
      )
    );
  });
});
