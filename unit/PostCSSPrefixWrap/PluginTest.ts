import Assert from "assert";
import PostCSS from "postcss";

import OurPlugin from "../../src/PostCSSPrefixWrap/OurPlugin";

describe("Unit: PostCSSPrefixWrap/Plugin.js", () => {
  const prefixSelector = ".my-custom-wrap";

  it("cssRuleMatchesPrefixSelector() correctly identifies our prefix Selector", () => {
    const plugin = new OurPlugin(prefixSelector);
    const cssRule = PostCSS.rule({
      selector: prefixSelector
    });

    Assert.strictEqual(plugin.cssRuleMatchesPrefixSelector(cssRule), true);
  });

  it("cssRuleMatchesPrefixSelector() correctly ignores another Selector", () => {
    const plugin = new OurPlugin(prefixSelector);
    const selector = ".not-my-custom-wrap";
    const cssRule = PostCSS.rule({
      selector: selector
    });

    Assert.strictEqual(plugin.cssRuleMatchesPrefixSelector(cssRule), false);
  });

  it("prefixWrapCSSRule() leaves prefix Selector alone", () => {
    const plugin = new OurPlugin(prefixSelector);
    const cssRule = PostCSS.rule({
      selector: prefixSelector
    });

    plugin.prefixWrapCSSRule(cssRule);

    Assert.strictEqual(cssRule.selector, prefixSelector);
  });

  it("prefixWrapCSSRule() does not change for empty Selector", () => {
    const plugin = new OurPlugin(prefixSelector);
    const cssRule = PostCSS.rule({
      selector: ""
    });

    plugin.prefixWrapCSSRule(cssRule);

    Assert.strictEqual(cssRule.selector, "");
  });

  // it("prefixWrapCSSRule() prefixes non root selectors with prefix Selector", () => {
  //   const plugin = new OurPlugin(prefixSelector);
  //
  //   ["div", "p", "h1"].forEach(selector => {
  //     const cssRule = PostCSS.rule({
  //       selector: selector,
  //       parent: new PostCSS.root()
  //     });
  //
  //     plugin.prefixWrapCSSRule(cssRule);
  //
  //     Assert.strictEqual(cssRule.selector, `${prefixSelector} ${selector}`);
  //   });
  // });
});
