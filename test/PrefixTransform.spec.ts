import * as path from "path";

import { it } from "@jest/globals";

import { assertActualMatchesExpectedAfterPrefixWrap } from "./support/PrefixAssert";
import { postCSSWithPlugin } from "./support/PluginBootstrap";

const postCSSIgnore = postCSSWithPlugin({
    prefixTransform: (selector: string, prefixSelector: string) => {
        const insertIndex = selector.indexOf(".m_");

        // If `.m_` not found, just return selector unchanged.
        if (insertIndex === -1) {
            return selector;
        }

        // Place the prefix (with a space) before the `.m_`.
        return `${selector.slice(0, insertIndex)}${prefixSelector} ${selector.slice(insertIndex)}`;
    },
});

it("supports user provided prefix transform", () => {
    assertActualMatchesExpectedAfterPrefixWrap(
        postCSSIgnore,
        path.join(__dirname, "fixtures", "prefix-transform-raw.css"),
        path.join(__dirname, "fixtures", "prefix-transform-expected.css"),
    );
});
