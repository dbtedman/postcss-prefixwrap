import { PostCSSContainer, PostCSSRule } from "../Types";
import { prefixWrapCSSRule } from "../internal/domain/CSSRuleWrapper";
import { shouldIncludeFilePath } from "../internal/domain/FileIncludeList";

export const PLUGIN_NAME = "postcss-prefixwrap";

export interface PostCSSPrefixWrapOptions {
    ignoredSelectors?: (string | RegExp)[];
    prefixRootTags?: boolean;
    whitelist?: Array<string>;
    blacklist?: Array<string>;
    nested?: string;
    appendCompoundSelector?: boolean;
}

export default class PostCSSPrefixWrap {
    private readonly blacklist: Array<string>;
    private readonly ignoredSelectors: (string | RegExp)[];
    private readonly isPrefixSelector: RegExp;
    private readonly prefixRootTags: boolean;
    private readonly prefixSelector: string;
    private readonly whitelist: Array<string>;
    private readonly nested: string | null;
    private readonly appendCompoundSelector: boolean;

    constructor(
        prefixSelector: string,
        options: PostCSSPrefixWrapOptions = {},
    ) {
        this.blacklist = options.blacklist ?? [];
        this.ignoredSelectors = options.ignoredSelectors ?? [];
        this.isPrefixSelector = new RegExp(
            // eslint-disable-next-line security-node/non-literal-reg-expr
            `^${prefixSelector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`,
        );
        this.prefixRootTags = options.prefixRootTags ?? false;
        this.prefixSelector = prefixSelector;
        this.whitelist = options.whitelist ?? [];
        this.nested = options.nested ?? null;
        this.appendCompoundSelector = options.appendCompoundSelector === true;
    }

    prefixRoot(css: PostCSSContainer): void {
        if (
            shouldIncludeFilePath(
                css.source?.input?.file,
                this.whitelist,
                this.blacklist,
            )
        ) {
            css.walkRules((cssRule: PostCSSRule) => {
                prefixWrapCSSRule(
                    cssRule,
                    this.nested,
                    this.ignoredSelectors,
                    this.prefixSelector,
                    this.prefixRootTags,
                    this.appendCompoundSelector,
                );
            });
        }
    }

    prefix() {
        return (css: PostCSSContainer): void => {
            this.prefixRoot(css);
        };
    }
}
