import { strictEqual } from "assert";
import PostCSS from "postcss";

import CSSSelector, {
  cssRuleMatchesPrefixSelector,
} from "../../../../src/internal/domain/CSSSelector";

describe("Selector", () => {
  it("Selector.isValid() is true for null Selector", () => {
    // strictEqual(Selector.isValid(null), false);
    expect(CSSSelector.isValid(null)).toStrictEqual(false);
  });

  it("Selector.clean() removes extra space padding", () => {
    strictEqual(CSSSelector.clean(" div "), "div");
    strictEqual(CSSSelector.clean(" div"), "div");
    strictEqual(CSSSelector.clean("div "), "div");
  });

  it("Selector.isNotRootTag() is true for root tags", () => {
    strictEqual(CSSSelector.isNotRootTag("html"), false);
    strictEqual(CSSSelector.isNotRootTag("body"), false);
    strictEqual(CSSSelector.isNotRootTag(":root"), false);
  });

  it("Selector.isNotRootTag() is false for non root tags", () => {
    strictEqual(CSSSelector.isNotRootTag("div"), true);
    strictEqual(CSSSelector.isNotRootTag("p"), true);
    strictEqual(CSSSelector.isNotRootTag("span"), true);
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
