import PostCSSPrefixWrap, {
  PLUGIN_NAME,
  PostCSSPrefixWrapOptions,
} from "PostCSSPrefixWrap";
import { PostCSSAcceptedPlugin, PostCSSContainer } from "Types";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/no-explicit-any
export = (postcss: any): any => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (typeof postcss.plugin !== "function") {
    // PostCSS v8
    return (
      prefixSelector: string,
      options?: PostCSSPrefixWrapOptions
    ): PostCSSAcceptedPlugin => {
      const plugin = new PostCSSPrefixWrap(prefixSelector, options);

      return {
        postcssPlugin: PLUGIN_NAME,
        Root(root: PostCSSContainer): void {
          plugin.prefixRoot(root);
        },
      };
    };
  } else {
    // PostCSS v7
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return postcss.plugin(
      PLUGIN_NAME,
      (prefixSelector: string, options?: PostCSSPrefixWrapOptions) => {
        return new PostCSSPrefixWrap(prefixSelector, options).prefix();
      }
    );
  }
};
