import { Container, Rule } from "postcss";

import { prefixWrapCSSRule } from "../internal/domain/CSSRuleWrapper";
import { shouldIncludeFilePath } from "../internal/domain/FileIncludeList";

export const PLUGIN_NAME = "postcss-prefixwrap";

export interface PostCSSPrefixWrapOptions {
    blacklist?: Array<string>;
    ignoredSelectors?: (string | RegExp)[];
    nested?: string;
    prefixRootTags?: boolean;
    prefixTransform?: (selector: string, prefix: string) => string;
    whitelist?: Array<string>;
}

export default class PostCSSPrefixWrap {
    private readonly blacklist: Array<string>;
    private readonly ignoredSelectors: (string | RegExp)[];
    private readonly isPrefixSelector: RegExp;
    private readonly nested: string | null;
    private readonly prefixRootTags: boolean;
    private readonly prefixSelector: string;
    private readonly prefixTransform:
        | null
        | ((selector: string, prefix: string) => string);
    private readonly whitelist: Array<string>;

    constructor(
        prefixSelector: string,
        options: PostCSSPrefixWrapOptions = {},
    ) {
        this.blacklist = options.blacklist ?? [];
        this.ignoredSelectors = options.ignoredSelectors ?? [];
        this.isPrefixSelector = new RegExp(
            `^${prefixSelector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`,
        );
        this.nested = options.nested ?? null;
        this.prefixRootTags = options.prefixRootTags ?? false;
        this.prefixSelector = prefixSelector;
        this.prefixTransform = options.prefixTransform ?? null;
        this.whitelist = options.whitelist ?? [];
    }

    prefixRoot(css: Container): void {
        if (
            shouldIncludeFilePath(
                css.source?.input?.file,
                this.whitelist,
                this.blacklist,
            )
        ) {
            css.walkRules((cssRule: Rule) => {
                if (cssRule?.parent?.type !== "rule") {
                    prefixWrapCSSRule(
                        cssRule,
                        this.nested,
                        this.ignoredSelectors,
                        this.prefixSelector,
                        this.prefixRootTags,
                        this.prefixTransform,
                    );
                }
            });
        }
    }

    prefix() {
        return (css: Container): void => {
            this.prefixRoot(css);
        };
    }
}
