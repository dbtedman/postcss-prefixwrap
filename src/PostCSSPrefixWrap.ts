import Selector from "./Selector";
import { PostCSSContainer, PostCSSRule } from "Types";

export const PLUGIN_NAME = "postcss-prefixwrap";

export interface PostCSSPrefixWrapOptions {
  ignoredSelectors?: (string | RegExp)[];
  prefixRootTags?: boolean;
  whitelist?: Array<string>;
  blacklist?: Array<string>;
  nested?: string;
}

export default class PostCSSPrefixWrap {
  private readonly blacklist: Array<string>;
  private readonly ignoredSelectors: (string | RegExp)[];
  private readonly isPrefixSelector: RegExp;
  private readonly prefixRootTags: boolean;
  private readonly prefixSelector: string;
  private readonly whitelist: Array<string>;
  private readonly nested: string | null;

  constructor(prefixSelector: string, options: PostCSSPrefixWrapOptions = {}) {
    this.blacklist = options.blacklist ?? [];
    this.ignoredSelectors = options.ignoredSelectors ?? [];

    const escapedPrefixSelector = prefixSelector.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&"
    );

    // eslint-disable-next-line security-node/non-literal-reg-expr
    this.isPrefixSelector = new RegExp(`^${escapedPrefixSelector}$`);
    this.prefixRootTags = options.prefixRootTags ?? false;
    this.prefixSelector = prefixSelector;
    this.whitelist = options.whitelist ?? [];
    this.nested = options.nested ?? null;
  }

  prefixWrapCSSSelector(
    cssSelector: string,
    cssRule: PostCSSRule
  ): string | null {
    const cleanSelector = Selector.clean(cssSelector);

    if (cleanSelector === "") {
      return null;
    }

    // Don't prefix nested selected.
    if (this.nested !== null && cleanSelector.startsWith(this.nested, 0)) {
      return cleanSelector;
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
    return cleanSelector.replace(/^(body|html|:root)/, this.prefixSelector);
  }

  cssRuleMatchesPrefixSelector(cssRule: { selector: string }): boolean {
    return this.isPrefixSelector.test(cssRule.selector);
  }

  prefixWrapCSSRule(cssRule: PostCSSRule): void {
    // Check each rule to see if it exactly matches our prefix selector, when
    // this happens, don't try to prefix that selector.
    const rules = cssRule.selector
      .split(",")
      .filter(
        (selector) => !this.cssRuleMatchesPrefixSelector({ selector: selector })
      );

    if (rules.length === 0) {
      return;
    }

    cssRule.selector = rules
      .map((cssSelector) => this.prefixWrapCSSSelector(cssSelector, cssRule))
      .filter(Selector.isValid)
      .join(", ");
  }

  includeFile(css: PostCSSContainer): boolean {
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

  prefixRoot(css: PostCSSContainer): void {
    if (this.includeFile(css)) {
      css.walkRules((cssRule: PostCSSRule) => {
        this.prefixWrapCSSRule(cssRule);
      });
    }
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  prefix(): Function {
    return (css: PostCSSContainer): void => {
      this.prefixRoot(css);
    };
  }
}
