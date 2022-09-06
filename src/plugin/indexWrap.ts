import PostCSSPrefixWrap, {
  PLUGIN_NAME,
  PostCSSPrefixWrapOptions,
} from "./PostCSSPrefixWrap";
import {
  PostCSS7Plugin,
  PostCSS7PostCSS,
  PostCSS8Plugin,
  PostCSS8PostCSS,
  PostCSSAcceptedPlugin,
  PostCSSContainer,
} from "Types";

const isPostCSSv8 = (postcss: PostCSS7PostCSS | PostCSS8PostCSS) =>
  (postcss as PostCSS8PostCSS).Root !== undefined;

export = (
  postcss: PostCSS7PostCSS | PostCSS8PostCSS
): PostCSS7Plugin | PostCSS8Plugin => {
  if (isPostCSSv8(postcss)) {
    return (
      prefixSelector: string,
      options?: PostCSSPrefixWrapOptions
    ): PostCSSAcceptedPlugin => {
      const plugin = new PostCSSPrefixWrap(prefixSelector, options);

      return {
        postcssPlugin: PLUGIN_NAME,
        Once(root: PostCSSContainer): void {
          plugin.prefixRoot(root);
        },
      };
    };
  } else {
    return (postcss as PostCSS7PostCSS).plugin(
      PLUGIN_NAME,
      (prefixSelector: string, options?: PostCSSPrefixWrapOptions) => {
        return new PostCSSPrefixWrap(prefixSelector, options).prefix();
      }
    );
  }
};
