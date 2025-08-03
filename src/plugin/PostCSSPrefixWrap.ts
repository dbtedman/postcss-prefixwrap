import { Container, Rule } from "postcss";

import { prefixWrapCSSRule } from "../internal/domain/CSSRuleWrapper";
import { shouldIncludeFilePath } from "../internal/domain/FileIncludeList";

export const PLUGIN_NAME = "postcss-prefixwrap";

export interface PostCSSPrefixWrapOptions {
    ignoredSelectors?: (string | RegExp)[];
    prefixRootTags?: boolean;
    whitelist?: Array<string>;
    blacklist?: Array<string>;
    nested?: string;
}

export default class PostCSSPrefixWrap {
    private readonly blacklist: Array<string>;
    private readonly ignoredSelectors: (string | RegExp)[];
    private readonly isPrefixSelector: RegExp;
    private readonly prefixRootTags: boolean;
    private readonly prefixSelector: string;
    private readonly whitelist: Array<string>;
    private readonly nested: string | null;

    constructor(
        prefixSelector: string,
        options: PostCSSPrefixWrapOptions = {},
    ) {
        this.blacklist = options.blacklist ?? [];
        this.ignoredSelectors = options.ignoredSelectors ?? [];
        this.isPrefixSelector = new RegExp(
            `^${prefixSelector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`,
        );
        this.prefixRootTags = options.prefixRootTags ?? false;
        this.prefixSelector = prefixSelector;
        this.whitelist = options.whitelist ?? [];
        this.nested = options.nested ?? null;
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
                if (cssRule?.parent?.type === "root") {
                    prefixWrapCSSRule(
                        cssRule,
                        this.nested,
                        this.ignoredSelectors,
                        this.prefixSelector,
                        this.prefixRootTags,
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
