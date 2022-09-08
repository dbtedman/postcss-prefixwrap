import {
  cleanSelector,
  cssRuleMatchesPrefixSelector,
  isKeyframes,
  isNotRootTag,
} from "../internal/domain/CSSSelector";
import { PostCSSContainer, PostCSSRule } from "Types";
import { prefixWrapCSSRule } from "internal/domain/CSSRuleWrapper";

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

  // TODO: Move to CSSRuleWrapper
  prefixWrapCSSSelector(
    cssSelector: string,
    cssRule: PostCSSRule
  ): string | null {
    const cleanedSelector = cleanSelector(cssSelector);

    if (cleanedSelector === "") {
      return null;
    }

    // Don't prefix nested selected.
    if (this.nested !== null && cleanedSelector.startsWith(this.nested, 0)) {
      return cleanedSelector;
    }

    // Do not prefix keyframes rules.
    if (isKeyframes(cssRule)) {
      return cleanedSelector;
    }

    // Check for matching ignored selectors
    if (
      this.ignoredSelectors.some((currentValue) =>
        cleanedSelector.match(currentValue)
      )
    ) {
      return cleanedSelector;
    }

    // Anything other than a root tag is always prefixed.
    if (isNotRootTag(cleanedSelector)) {
      return this.prefixSelector + " " + cleanedSelector;
    }

    // Handle special case where root tags should be converted into classes
    // rather than being replaced.
    if (this.prefixRootTags) {
      return this.prefixSelector + " ." + cleanedSelector;
    }

    // HTML and Body elements cannot be contained within our container so lets
    // extract their styles.
    return cleanedSelector.replace(/^(body|html|:root)/, this.prefixSelector);
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
        prefixWrapCSSRule(
          cssRule,
          (cssRule: { selector: string }) =>
            cssRuleMatchesPrefixSelector(cssRule, this.prefixSelector),
          (cssSelector: string, cssRule: PostCSSRule) =>
            this.prefixWrapCSSSelector(cssSelector, cssRule)
        );
      });
    }
  }

  // path consumed just by v7
  prefix() {
    return (css: PostCSSContainer): void => {
      this.prefixRoot(css);
    };
  }
}
