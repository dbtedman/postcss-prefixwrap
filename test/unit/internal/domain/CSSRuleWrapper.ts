import PostCSS from "postcss";
import PostCSSPrefixWrap from "../../../../src/plugin/PostCSSPrefixWrap";
import { prefixWrapCSSRule } from "../../../../src/internal/domain/CSSRuleWrapper";
import { PostCSSRule } from "../../../../src/Types";

describe("CSSRuleWrapper", () => {
  const prefixSelector = ".my-custom-wrap";

  it("prefixWrapCSSRule() leaves prefix Selector alone", () => {
    const plugin = new PostCSSPrefixWrap(prefixSelector);
    const cssRule = PostCSS.rule({
      selector: prefixSelector,
    });

    prefixWrapCSSRule(
      cssRule,
      (cssRule: { selector: string }) =>
        plugin.cssRuleMatchesPrefixSelector(cssRule),
      (cssSelector: string, cssRule: PostCSSRule) =>
        plugin.prefixWrapCSSSelector(cssSelector, cssRule)
    );

    expect(cssRule.selector).toStrictEqual(prefixSelector);
  });

  it("prefixWrapCSSRule() does not change for empty Selector", () => {
    const plugin = new PostCSSPrefixWrap(prefixSelector);
    const cssRule = PostCSS.rule({
      selector: "",
    });

    prefixWrapCSSRule(
      cssRule,
      (cssRule: { selector: string }) =>
        plugin.cssRuleMatchesPrefixSelector(cssRule),
      (cssSelector: string, cssRule: PostCSSRule) =>
        plugin.prefixWrapCSSSelector(cssSelector, cssRule)
    );

    expect(cssRule.selector).toStrictEqual("");
  });

  it("prefixWrapCSSRule() prefixes non root selectors with prefix Selector", () => {
    const plugin = new PostCSSPrefixWrap(prefixSelector);

    ["div", "p", "h1"].forEach((selector) => {
      const parent = PostCSS.root();
      const cssRule = PostCSS.rule({
        selector: selector,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        parent: parent,
      });

      prefixWrapCSSRule(
        cssRule,
        (cssRule: { selector: string }) =>
          plugin.cssRuleMatchesPrefixSelector(cssRule),
        (cssSelector: string, cssRule: PostCSSRule) =>
          plugin.prefixWrapCSSSelector(cssSelector, cssRule)
      );

      expect(cssRule.selector).toStrictEqual(`${prefixSelector} ${selector}`);
    });
  });
});
