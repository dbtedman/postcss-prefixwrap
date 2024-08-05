import { AcceptedPlugin, Root } from "postcss";

import { PostCSSPrefixWrapOptions } from "./plugin/PostCSSPrefixWrap";

export interface PostCSSAcceptedPlugin {
    postcssPlugin: string;

    Once(root: Root): void;
}

export interface PostcssV7 {
    plugin: (
        name: string,
        thing: (
            prefixSelector: string,
            options?: PostCSSPrefixWrapOptions,
        ) => void,
    ) => PostCSS8Plugin;
}

export type PostCSS7Plugin = () => AcceptedPlugin;
export type PostCSS8Plugin = (
    prefixSelector: string,
    options?: PostCSSPrefixWrapOptions,
) => AcceptedPlugin;
