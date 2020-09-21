import PostCSS from "postcss";
import PrefixWrap from "../../index";

import { PostCSSPrefixWrapOptions } from "PostCSSPrefixWrap";
import Processor from "postcss/lib/processor";

export const postCSSWithPlugin = (
  options: PostCSSPrefixWrapOptions = {},
  selector = ".my-container"
): Processor => {
  return PostCSS([PrefixWrap(selector, options)]);
};
