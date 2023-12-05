import PostCSS from "postcss";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Processor from "postcss/lib/processor";

import PrefixWrap from "../../src";

import { PostCSSPrefixWrapOptions } from "../../src/plugin/PostCSSPrefixWrap";

export const postCSSWithPlugin = (
    options: PostCSSPrefixWrapOptions = {},
    selector = ".my-container",
): Processor => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return PostCSS([PrefixWrap(selector, options)]);
};
