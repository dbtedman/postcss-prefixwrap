import Assert from "assert";
import PostCSS from "postcss";

import PostCSSPrefixWrap from "./PostCSSPrefixWrap";

describe("Plugin", () => {
  const prefixSelector = ".my-custom-wrap";

  it("Plugin.cssRuleMatchesPrefixSelector() correctly identifies our prefix Selector", () => {
    const plugin = new PostCSSPrefixWrap(prefixSelector);
    const cssRule = PostCSS.rule({
      selector: prefixSelector,
    });

    Assert.strictEqual(plugin.cssRuleMatchesPrefixSelector(cssRule), true);
  });

  it("Plugin.cssRuleMatchesPrefixSelector() correctly ignores another Selector", () => {
    const plugin = new PostCSSPrefixWrap(prefixSelector);
    const selector = ".not-my-custom-wrap";
    const cssRule = PostCSS.rule({
      selector: selector,
    });

    Assert.strictEqual(plugin.cssRuleMatchesPrefixSelector(cssRule), false);
  });

  it("Plugin.prefixWrapCSSRule() leaves prefix Selector alone", () => {
    const plugin = new PostCSSPrefixWrap(prefixSelector);
    const cssRule = PostCSS.rule({
      selector: prefixSelector,
    });

    plugin.prefixWrapCSSRule(cssRule);

    Assert.strictEqual(cssRule.selector, prefixSelector);
  });

  it("Plugin.prefixWrapCSSRule() does not change for empty Selector", () => {
    const plugin = new PostCSSPrefixWrap(prefixSelector);
    const cssRule = PostCSS.rule({
      selector: "",
    });

    plugin.prefixWrapCSSRule(cssRule);

    Assert.strictEqual(cssRule.selector, "");
  });

  it("Plugin.prefixWrapCSSRule() prefixes non root selectors with prefix Selector", () => {
    const plugin = new PostCSSPrefixWrap(prefixSelector);

    ["div", "p", "h1"].forEach((selector) => {
      const parent = PostCSS.root();
      const cssRule = PostCSS.rule({
        selector: selector,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        parent: parent,
      });

      plugin.prefixWrapCSSRule(cssRule);

      Assert.strictEqual(cssRule.selector, `${prefixSelector} ${selector}`);
    });
  });

  it("handles includeFile with whitelist when missing source input data", () => {
    const plugin = new PostCSSPrefixWrap(prefixSelector, {
      whitelist: [".something"],
    });

    Assert.strictEqual(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      plugin.includeFile({
        source: undefined,
      }),
      false
    );

    Assert.strictEqual(
      plugin.includeFile({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        source: {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          input: {
            file: undefined,
          },
        },
      }),
      false
    );
  });

  it("handles includeFile with blacklist when missing source input data", () => {
    const plugin = new PostCSSPrefixWrap(prefixSelector, {
      blacklist: [".something"],
    });

    Assert.strictEqual(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      plugin.includeFile({
        source: undefined,
      }),
      true
    );

    Assert.strictEqual(
      plugin.includeFile({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        source: {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          input: {
            file: undefined,
          },
        },
      }),
      true
    );
  });
});
