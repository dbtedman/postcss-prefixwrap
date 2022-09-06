import PostCSS from "postcss";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import PrefixWrap from "../../../src";

import { PostCSSPrefixWrapOptions } from "../../../src/plugin/PostCSSPrefixWrap";
import Processor from "postcss/lib/processor";

export const postCSSWithPlugin = (
  options: PostCSSPrefixWrapOptions = {},
  selector = ".my-container"
): Processor => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return PostCSS([PrefixWrap(selector, options)]);
};
