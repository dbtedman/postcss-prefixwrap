import { Rule } from "postcss";

import Selector from "./Selector";

export const PLUGIN_NAME = "postcss-prefixwrap";

export interface PostCSSPrefixWrapOptions {
  ignoredSelectors?: (string | RegExp)[];
  prefixRootTags?: boolean;
  whitelist?: Array<string>;
  blacklist?: Array<string>;
}

export default class PostCSSPrefixWrap {
  private readonly blacklist: Array<string>;
  private readonly ignoredSelectors: (string | RegExp)[];
  private readonly isPrefixSelector: RegExp;
  private readonly prefixRootTags: boolean;
  private readonly prefixSelector: string;
  private readonly whitelist: Array<string>;

  constructor(prefixSelector: string, options: PostCSSPrefixWrapOptions = {}) {
    this.blacklist = options.blacklist ?? [];
    this.ignoredSelectors = options.ignoredSelectors ?? [];
    // eslint-disable-next-line security-node/non-literal-reg-expr
    this.isPrefixSelector = new RegExp(`^s*${prefixSelector}.*$`);
    this.prefixRootTags = options.prefixRootTags ?? false;
    this.prefixSelector = prefixSelector;
    this.whitelist = options.whitelist ?? [];
  }

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
      this.ignoredSelectors.some((currentValue) =>
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

  prefixWrapCSSRule(cssRule: Rule): void {
    if (this.cssRuleMatchesPrefixSelector(cssRule)) {
      return;
    }

    cssRule.selector = cssRule.selector
      .split(",")
      .map((cssSelector) => this.prefixWrapCSSSelector(cssSelector, cssRule))
      .filter(Selector.isValid)
      .join(", ");
  }

  includeRule(css: Rule): boolean {
    // If whitelist exists, check if rule is contained within it.
    if (this.whitelist.length > 0) {
      return this.whitelist.some((currentValue) =>
        css.source?.input.file?.match(currentValue)
      );
    }

    // If blacklist exists, check if rule is not contained within it.
    if (this.blacklist.length > 0) {
      return !this.blacklist.some((currentValue) =>
        css.source?.input.file?.match(currentValue)
      );
    }

    // In all other cases, presume rule should be prefixed.
    return true;
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  prefix(): Function {
    return (css: Rule): void => {
      if (this.includeRule(css)) {
        css.walkRules((cssRule: Rule) => {
          this.prefixWrapCSSRule(cssRule);
        });
      }
    };
  }
}
