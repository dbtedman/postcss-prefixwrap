import { PostCSSAtRule, PostCSSRule } from "../../Types";

const ANY_WHITESPACE_AT_BEGINNING_OR_END = /(^\s*|\s*$)/g;
const IS_ROOT_TAG = /^(body|html|:root).*$/;

export const isValidCSSSelector = (cssSelector: string | null): boolean => {
    return cssSelector !== null;
};

export const cleanSelector = (cssSelector: string): string => {
    return cssSelector.replace(ANY_WHITESPACE_AT_BEGINNING_OR_END, "");
};

export const isKeyframes = (cssRule: PostCSSRule): boolean => {
    const { parent } = cssRule;
    const parentReal = parent as PostCSSAtRule;

    // @see https://developer.mozilla.org/en-US/docs/Web/CSS/At-rule
    return (
        parent !== undefined &&
        parentReal.type === "atrule" &&
        parentReal.name !== undefined &&
        parentReal.name.match(/keyframes$/) !== null
    );
};

export const isNotRootTag = (cleanSelector: string): boolean => {
    return !cleanSelector.match(IS_ROOT_TAG);
};

export const cssRuleMatchesPrefixSelector = (
    cssRule: { selector: string },
    prefixSelector: string
): boolean => {
    const escapedPrefixSelector = prefixSelector.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
    );

    // eslint-disable-next-line security-node/non-literal-reg-expr
    const isPrefixSelector = new RegExp(`^${escapedPrefixSelector}$`);

    return isPrefixSelector.test(cssRule.selector);
};
