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

  Root(root: PostCSSContainer): void;
}

// TODO: Should be the result of running PostCSS.plugin
export interface PostCSS7AcceptedPlugin {
  fake?: boolean;
}
