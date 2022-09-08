import { strictEqual } from "assert";
import PostCSS from "postcss";

import {
  cleanSelector,
  cssRuleMatchesPrefixSelector,
  isNotRootTag,
  isValidCSSSelector,
} from "../../../../src/internal/domain/CSSSelector";

describe("isValidCSSSelector", () => {
  it("is true for null Selector", () => {
    expect(isValidCSSSelector(null)).toStrictEqual(false);
  });
});

describe("cleanSelector", () => {
  it("removes extra space padding", () => {
    strictEqual(cleanSelector(" div "), "div");
    strictEqual(cleanSelector(" div"), "div");
    strictEqual(cleanSelector("div "), "div");
  });
});

// TODO: isKeyframes

describe("isNotRootTag", () => {
  it("is true for root tags", () => {
    strictEqual(isNotRootTag("html"), false);
    strictEqual(isNotRootTag("body"), false);
    strictEqual(isNotRootTag(":root"), false);
  });

  it("is false for non root tags", () => {
    strictEqual(isNotRootTag("div"), true);
    strictEqual(isNotRootTag("p"), true);
    strictEqual(isNotRootTag("span"), true);
  });
});

describe("cssRuleMatchesPrefixSelector", () => {
  it("correctly identifies our prefix Selector", () => {
    const prefixSelector = ".my-custom-wrap";
    const cssRule = PostCSS.rule({
      selector: prefixSelector,
    });

    strictEqual(cssRuleMatchesPrefixSelector(cssRule, prefixSelector), true);
  });

  it("correctly ignores selector that contains our prefix selector", () => {
    const prefixSelector = ".my-custom-wrap";
    const selector = `${prefixSelector}something`;
    const cssRule = PostCSS.rule({
      selector: selector,
    });

    strictEqual(cssRuleMatchesPrefixSelector(cssRule, prefixSelector), false);
  });

  it("correctly ignores another Selector", () => {
    const prefixSelector = ".my-custom-wrap";
    const selector = ".not-my-custom-wrap";
    const cssRule = PostCSS.rule({ selector: selector });

    strictEqual(cssRuleMatchesPrefixSelector(cssRule, prefixSelector), false);
  });
});
