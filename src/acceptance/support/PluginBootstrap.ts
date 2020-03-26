import PostCSS from "postcss";
import PrefixWrap from "../../index";

import { PostCSSPrefixWrapOptions } from "PostCSSPrefixWrap";

export const postCSSWithPlugin = (
  options: PostCSSPrefixWrapOptions = {},
  selector = ".my-container"
): PostCSS.Processor => {
  return PostCSS([PrefixWrap(selector, options)]);
};
