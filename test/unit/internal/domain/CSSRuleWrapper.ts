import PostCSS from "postcss";
import { prefixWrapCSSRule } from "../../../../src/internal/domain/CSSRuleWrapper";

describe("prefixWrapCSSRule()", () => {
  const prefixSelector = ".my-custom-wrap";

  it("leaves prefix Selector alone", () => {
    const cssRule = PostCSS.rule({
      selector: prefixSelector,
    });

    prefixWrapCSSRule(cssRule, null, [], prefixSelector, false);

    expect(cssRule.selector).toStrictEqual(prefixSelector);
  });

  it("does not change for empty Selector", () => {
    const cssRule = PostCSS.rule({
      selector: "",
    });

    prefixWrapCSSRule(cssRule, null, [], "", false);

    expect(cssRule.selector).toStrictEqual("");
  });

  it("prefixes non root selectors with prefix Selector", () => {
    ["div", "p", "h1"].forEach((selector) => {
      const parent = PostCSS.root();
      const cssRule = PostCSS.rule({
        selector: selector,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        parent: parent,
      });

      prefixWrapCSSRule(cssRule, null, [], selector, false);

      expect(cssRule.selector).toStrictEqual(`${prefixSelector} ${selector}`);
    });
  });
});
