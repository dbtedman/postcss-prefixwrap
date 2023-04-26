import * as path from "path";

import { describe, it } from "@jest/globals";

import { assertActualMatchesExpectedAfterPrefixWrap } from "./support/PrefixAssert";
import { postCSSWithPlugin } from "./support/PluginBootstrap";

describe("Acceptance: Ignored Selectors", () => {
    const postCSSIgnore = postCSSWithPlugin({
        ignoredSelectors: [":root", "#my-id", /^\.some-(.+)$/],
    });

    it("ignores selectors that are in a ignore list", () => {
        assertActualMatchesExpectedAfterPrefixWrap(
            postCSSIgnore,
            path.join(__dirname, "fixtures", "ignore-selectors.css"),
            path.join(__dirname, "fixtures", "ignore-selectors-expected.css")
        );
    });
});
