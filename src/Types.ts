import { PostCSSPrefixWrapOptions } from "PostCSSPrefixWrap";

// TODO: These types are incomplete for our needs

export interface PostCSSInput {
  file?: string;
}

export interface PostCSSSource {
  input: PostCSSInput;
}

export interface PostCSSContainer {
  source?: PostCSSSource;
  parent?: PostCSSContainer;
  type?: string;
  walkRules: (callback: (atRule: PostCSSRule) => void) => void;
}

export interface PostCSSRule extends PostCSSContainer {
  selector: string;
}

export interface PostCSSAtRule extends PostCSSContainer {
  name: string;
}

export interface PostCSSAcceptedPlugin {
  postcssPlugin: string;

  Once(root: PostCSSContainer): void;
}

export interface PostCSS7PostCSS {
  plugin: (
    name: string,
    thing: (prefixSelector: string, options?: PostCSSPrefixWrapOptions) => void
  ) => PostCSS8Plugin;
}

export interface PostCSS8PostCSS {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment,@typescript-eslint/no-explicit-any
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Root: any;
}

export type PostCSS7Plugin = () => PostCSSAcceptedPlugin;
export type PostCSS8Plugin = (
  prefixSelector: string,
  options?: PostCSSPrefixWrapOptions
) => PostCSSAcceptedPlugin;
