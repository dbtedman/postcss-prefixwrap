const Assert = require("assert");
const PostCSS = require("postcss");

const Plugin = require("../../src/PostCSSPrefixWrap/Plugin");

describe("Unit: PostCSSPrefixWrap/Plugin.js", () => {
  const prefixSelector = ".my-custom-wrap";

  it("cssRuleMatchesPrefixSelector() correctly identifies our prefix selector", () => {
    const plugin = new Plugin(prefixSelector);
    const cssRule = PostCSS.rule({
      selector: prefixSelector
    });

    Assert.strictEqual(plugin.cssRuleMatchesPrefixSelector(cssRule), true);
  });

  it("cssRuleMatchesPrefixSelector() correctly ignores another selector", () => {
    const plugin = new Plugin(prefixSelector);
    const selector = ".not-my-custom-wrap";
    const cssRule = PostCSS.rule({
      selector: selector
    });

    Assert.strictEqual(plugin.cssRuleMatchesPrefixSelector(cssRule), false);
  });

  it("prefixWrapCSSRule() leaves prefix selector alone", () => {
    const plugin = new Plugin(prefixSelector);
    const cssRule = PostCSS.rule({
      selector: prefixSelector
    });

    plugin.prefixWrapCSSRule(cssRule);

    Assert.strictEqual(cssRule.selector, prefixSelector);
  });

  it("prefixWrapCSSRule() does not change for empty selector", () => {
    const plugin = new Plugin(prefixSelector);
    const cssRule = PostCSS.rule({
      selector: ""
    });

    plugin.prefixWrapCSSRule(cssRule);

    Assert.strictEqual(cssRule.selector, "");
  });

  it("prefixWrapCSSRule() prefixes non root selectors with prefix selector", () => {
    const plugin = new Plugin(prefixSelector);

    ["div", "p", "h1"].forEach(selector => {
      const cssRule = PostCSS.rule({
        selector: selector,
        parent: new PostCSS.root()
      });

      plugin.prefixWrapCSSRule(cssRule);

      Assert.strictEqual(cssRule.selector, `${prefixSelector} ${selector}`);
    });
  });
});
