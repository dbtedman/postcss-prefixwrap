import { Container, Postcss } from "postcss";

import { PostcssV7, PostCSSAcceptedPlugin } from "../Types";

import PostCSSPrefixWrap, {
    PLUGIN_NAME,
    PostCSSPrefixWrapOptions,
} from "./PostCSSPrefixWrap";

export const isPostCSSv8 = (postcss: PostcssV7 | Postcss) =>
    (postcss as Postcss).Root !== undefined;

export const asPostCSSv8PluginGenerator = () => {
    return (
        prefixSelector: string,
        options?: PostCSSPrefixWrapOptions,
    ): PostCSSAcceptedPlugin => {
        const plugin = new PostCSSPrefixWrap(prefixSelector, options);

        return {
            postcssPlugin: PLUGIN_NAME,
            Once(root: Container): void {
                plugin.prefixRoot(root);
            },
        };
    };
};
