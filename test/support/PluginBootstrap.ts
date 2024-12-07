import PostCSS from "postcss";

// @ts-ignore
import Processor from "postcss/lib/processor";

import PrefixWrap from "../../src";

import { PostCSSPrefixWrapOptions } from "../../src/plugin/PostCSSPrefixWrap";

export const postCSSWithPlugin = (
    options: PostCSSPrefixWrapOptions = {},
    selector = ".my-container",
): Processor => {
    // @ts-ignore
    return PostCSS([PrefixWrap(selector, options)]);
};
