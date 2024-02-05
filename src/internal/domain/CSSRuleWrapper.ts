import { PostCSSRule } from "../../Types";

import {
    cleanSelector,
    cssRuleMatchesPrefixSelector,
    isKeyframes,
    isNotRootTag,
    isValidCSSSelector,
} from "./CSSSelector";

export const prefixWrapCSSRule = (
    cssRule: PostCSSRule,
    nested: string | null,
    ignoredSelectors: (string | RegExp)[],
    prefixSelector: string,
    prefixRootTags: boolean,
    appendCompoundSelector: boolean,
): void => {
    // Check each rule to see if it exactly matches our prefix selector, when
    // this happens, don't try to prefix that selector.
    const rules = cssRule.selector
        .split(",")
        .filter(
            (selector) =>
                !cssRuleMatchesPrefixSelector(
                    { selector: selector },
                    prefixSelector,
                ),
        );

    if (rules.length === 0) {
        return;
    }

    cssRule.selector = rules
        .map((cssSelector) =>
            prefixWrapCSSSelector(
                cssSelector,
                cssRule,
                nested,
                ignoredSelectors,
                prefixSelector,
                prefixRootTags,
                appendCompoundSelector,
            ),
        )
        .filter(isValidCSSSelector)
        .join(", ");
};

export const prefixWrapCSSSelector = (
    cssSelector: string,
    cssRule: PostCSSRule,
    nested: string | null,
    ignoredSelectors: (string | RegExp)[],
    prefixSelector: string,
    prefixRootTags: boolean,
    appendCompoundSelector: boolean,
): string | null => {
    const cleanedSelector = cleanSelector(cssSelector);

    if (cleanedSelector === "") {
        return null;
    }

    // Don't prefix nested selected.
    if (nested !== null && cleanedSelector.startsWith(nested, 0)) {
        return cleanedSelector;
    }

    // Do not prefix keyframes rules.
    if (isKeyframes(cssRule)) {
        return cleanedSelector;
    }

    // Check for matching ignored selectors
    if (
        ignoredSelectors.some((currentValue) =>
            cleanedSelector.match(currentValue),
        )
    ) {
        return cleanedSelector;
    }

    // Anything other than a root tag is always prefixed.
    if (isNotRootTag(cleanedSelector)) {
        return appendCompoundSelectorToSelector(
            prefixSelector,
            cleanedSelector,
            appendCompoundSelector,
        );
    }

    // Handle special case where root tags should be converted into classes
    // rather than being replaced.
    if (prefixRootTags) {
        return appendCompoundSelectorToSelector(
            prefixSelector,
            `.${cleanedSelector}`,
            appendCompoundSelector,
        );
    }

    // HTML and Body elements cannot be contained within our container so lets
    // extract their styles.
    return cleanedSelector.replace(/^(body|html|:root)/, prefixSelector);
};

const appendCompoundSelectorToSelector = (
    prefixSelector: string,
    selector: string,
    appendCompoundSelector: boolean,
) => {
    let result = prefixSelector + " " + selector;

    if (appendCompoundSelector) {
        result += `, ${prefixSelector}${selector}`;
    }

    return result;
};
