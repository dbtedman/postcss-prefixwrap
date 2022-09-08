import { PostCSSRule } from "Types";
import CSSSelector from "internal/domain/CSSSelector";

export const prefixWrapCSSRule = (
  cssRule: PostCSSRule,
  cssRuleMatchesPrefixSelector: (cssRule: { selector: string }) => boolean,
  prefixWrapCSSSelector: (
    cssSelector: string,
    cssRule: PostCSSRule
  ) => string | null
): void => {
  // Check each rule to see if it exactly matches our prefix selector, when
  // this happens, don't try to prefix that selector.
  const rules = cssRule.selector
    .split(",")
    .filter(
      (selector) => !cssRuleMatchesPrefixSelector({ selector: selector })
    );

  if (rules.length === 0) {
    return;
  }

  cssRule.selector = rules
    .map((cssSelector) => prefixWrapCSSSelector(cssSelector, cssRule))
    .filter(CSSSelector.isValid)
    .join(", ");
};
