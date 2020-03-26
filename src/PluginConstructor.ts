import PostCSS, { AcceptedPlugin } from "postcss";
import PostCSSPrefixWrap, {
  PostCSSPrefixWrapOptions,
  PLUGIN_NAME,
} from "./PostCSSPrefixWrap";

export default class PluginConstructor {
  asPostCSSPlugin(): (
    prefixSelector: string,
    options?: PostCSSPrefixWrapOptions
  ) => AcceptedPlugin {
    // This plugin was initially defined with an incorrect interface so
    // TypeScript will error here without the "@ts-ignore" statement. Eventually
    // we may fix this, however this will break systems using this plugin so
    // will only happen in a major version change.
    return PostCSS.plugin(
      PLUGIN_NAME,
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      (prefixSelector: string, options?: PostCSSPrefixWrapOptions) => {
        return new PostCSSPrefixWrap(prefixSelector, options).prefix();
      }
    );
  }
}
