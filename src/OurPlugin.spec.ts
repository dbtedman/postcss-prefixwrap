import Assert from "assert";
import PostCSS from "postcss";

import OurPlugin from "./OurPlugin";

describe("Plugin", () => {
  const prefixSelector = ".my-custom-wrap";

  it("Plugin.cssRuleMatchesPrefixSelector() correctly identifies our prefix Selector", () => {
    const plugin = new OurPlugin(prefixSelector);
    const cssRule = PostCSS.rule({
      selector: prefixSelector
    });

    Assert.strictEqual(plugin.cssRuleMatchesPrefixSelector(cssRule), true);
  });

  it("Plugin.cssRuleMatchesPrefixSelector() correctly ignores another Selector", () => {
    const plugin = new OurPlugin(prefixSelector);
    const selector = ".not-my-custom-wrap";
    const cssRule = PostCSS.rule({
      selector: selector
    });

    Assert.strictEqual(plugin.cssRuleMatchesPrefixSelector(cssRule), false);
  });

  it("Plugin.prefixWrapCSSRule() leaves prefix Selector alone", () => {
    const plugin = new OurPlugin(prefixSelector);
    const cssRule = PostCSS.rule({
      selector: prefixSelector
    });

    plugin.prefixWrapCSSRule(cssRule);

    Assert.strictEqual(cssRule.selector, prefixSelector);
  });

  it("Plugin.prefixWrapCSSRule() does not change for empty Selector", () => {
    const plugin = new OurPlugin(prefixSelector);
    const cssRule = PostCSS.rule({
      selector: ""
    });

    plugin.prefixWrapCSSRule(cssRule);

    Assert.strictEqual(cssRule.selector, "");
  });

  it("Plugin.prefixWrapCSSRule() prefixes non root selectors with prefix Selector", () => {
    const plugin = new OurPlugin(prefixSelector);

    ["div", "p", "h1"].forEach(selector => {
      const parent = PostCSS.root();
      const cssRule = PostCSS.rule({
        selector: selector,
        // @ts-ignore
        parent: parent
      });

      plugin.prefixWrapCSSRule(cssRule);

      Assert.strictEqual(cssRule.selector, `${prefixSelector} ${selector}`);
    });
  });
});
