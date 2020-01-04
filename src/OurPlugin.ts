import PostCSS, { Rule } from "postcss";

import Selector from "./Selector";
import Hash from "./Hash";

interface OurPluginOptions {
  ignoredSelectors?: Array<string>;
  prefixRootTags?: boolean;
  whitelist?: Array<string>;
}

export default class OurPlugin {
  private ignoredSelectors: Array<string>;
  private prefixRootTags: boolean;
  private isPrefixSelector: RegExp;
  private prefixSelector: string;
  private whitelist: Array<string>;

  constructor(prefixSelector: string, options = {}) {
    this.ignoredSelectors = Hash.value(options, "ignoredSelectors", []);
    this.prefixRootTags = Hash.value(options, "prefixRootTags", false);
    this.whitelist = Hash.value(options, "whitelist", []);
    this.isPrefixSelector = new RegExp(`^s*${prefixSelector}.*$`);
    this.prefixSelector = prefixSelector;
  }

  static asPostCSSPlugin(): PostCSS.Plugin<string> {
    const initializer = (prefixSelector: string, options: OurPluginOptions) => {
      return new OurPlugin(prefixSelector, options).prefix();
    };

    // TODO: How can we better avoid needing to ignore here?
    // @ts-ignore
    return PostCSS.plugin("postcss-prefixwrap", initializer);
  }

  // TODO: This function is getting a little too long, I need to consider how best to split it.
  prefixWrapCSSSelector(cssSelector: string, cssRule: Rule): string | null {
    const cleanSelector = Selector.clean(cssSelector);

    if (cleanSelector === "") {
      return null;
    }

    // Do not prefix keyframes rules.
    if (Selector.isKeyframes(cssRule)) {
      return cleanSelector;
    }

    // Check for matching ignored selectors
    if (
      this.ignoredSelectors.some(currentValue =>
        cleanSelector.match(currentValue)
      )
    ) {
      return cleanSelector;
    }

    // Anything other than a root tag is always prefixed.
    if (Selector.isNotRootTag(cleanSelector)) {
      return this.prefixSelector + " " + cleanSelector;
    }

    // Handle special case where root tags should be converted into classes
    // rather than being replaced.
    if (this.prefixRootTags) {
      return this.prefixSelector + " ." + cleanSelector;
    }

    // HTML and Body elements cannot be contained within our container so lets
    // extract their styles.
    return cleanSelector.replace(/^(body|html)/, this.prefixSelector);
  }

  cssRuleMatchesPrefixSelector(cssRule: Rule): boolean {
    return cssRule.selector.match(this.isPrefixSelector) !== null;
  }

  prefixWrapCSSRule(cssRule: Rule) {
    if (this.cssRuleMatchesPrefixSelector(cssRule)) {
      return;
    }

    cssRule.selector = cssRule.selector
      .split(",")
      .map(cssSelector => this.prefixWrapCSSSelector(cssSelector, cssRule))
      .filter(Selector.isValid)
      .join(", ");
  }

  prefix(): Function {
    return (css: Rule) => {
      if (
        !this.whitelist.length ||
        this.whitelist.some(currentValue =>
          css.source?.input.file?.match(currentValue)
        )
      ) {
        css.walkRules((cssRule: Rule) => {
          this.prefixWrapCSSRule(cssRule);
        });
      }
    };
  }
}
