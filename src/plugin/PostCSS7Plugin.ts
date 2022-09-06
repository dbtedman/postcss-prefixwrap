import { PostCSS7PostCSS } from "Types";
import PostCSSPrefixWrap, {
  PLUGIN_NAME,
  PostCSSPrefixWrapOptions,
} from "plugin/PostCSSPrefixWrap";

export const asPostCSSv7PluginGenerator = (postcss: PostCSS7PostCSS) => {
  return postcss.plugin(
    PLUGIN_NAME,
    (prefixSelector: string, options?: PostCSSPrefixWrapOptions) => {
      return new PostCSSPrefixWrap(prefixSelector, options).prefix();
    }
  );
};
