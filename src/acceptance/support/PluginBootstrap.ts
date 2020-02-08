import PostCSS from "postcss";
import PrefixWrap from "../../index";

import { PostCSSPrefixWrapOptions } from "PostCSSPrefixWrap";

export const postCSSWithPlugin = (
  options: PostCSSPrefixWrapOptions = {},
  selector: string = ".my-container"
) => {
  return PostCSS([PrefixWrap(selector, options)]);
};
