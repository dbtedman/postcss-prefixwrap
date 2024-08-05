import { PostcssV7 } from "../Types";

import PostCSSPrefixWrap, {
    PLUGIN_NAME,
    PostCSSPrefixWrapOptions,
} from "./PostCSSPrefixWrap";

export const asPostCSSv7PluginGenerator = (postcss: PostcssV7) => {
    return postcss.plugin(
        PLUGIN_NAME,
        (prefixSelector: string, options?: PostCSSPrefixWrapOptions) => {
            return new PostCSSPrefixWrap(prefixSelector, options).prefix();
        },
    );
};
