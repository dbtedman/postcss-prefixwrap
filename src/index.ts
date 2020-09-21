import PostCSSPrefixWrap, {
  PLUGIN_NAME,
  PostCSSPrefixWrapOptions,
} from "PostCSSPrefixWrap";
import { AcceptedPlugin } from "postcss";
import Root from "postcss/lib/root";

export = (
  prefixSelector: string,
  options?: PostCSSPrefixWrapOptions
): AcceptedPlugin => {
  const plugin = new PostCSSPrefixWrap(prefixSelector, options);

  return {
    postcssPlugin: PLUGIN_NAME,
    Root(root: Root): void {
      plugin.prefixRoot(root);
    },
  };
};
