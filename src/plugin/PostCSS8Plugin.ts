import {
  PostCSS7PostCSS,
  PostCSS8PostCSS,
  PostCSSAcceptedPlugin,
  PostCSSContainer,
} from "Types";
import PostCSSPrefixWrap, {
  PLUGIN_NAME,
  PostCSSPrefixWrapOptions,
} from "plugin/PostCSSPrefixWrap";

export const isPostCSSv8 = (postcss: PostCSS7PostCSS | PostCSS8PostCSS) =>
  (postcss as PostCSS8PostCSS).Root !== undefined;

export const asPostCSSv8PluginGenerator = () => {
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
};
