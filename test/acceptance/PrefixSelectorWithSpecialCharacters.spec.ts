import path from "path";

import { describe, it } from "@jest/globals";

import { assertActualMatchesExpectedAfterPrefixWrap } from "./support/PrefixAssert";

import { postCSSWithPlugin } from "./support/PluginBootstrap";

describe("Acceptance: Prefix selector with special characters", () => {
    it("handles .my-custom-selector[id^=my-id-starts-with-]", () => {
        const postCSS = postCSSWithPlugin(
            {},
            ".my-custom-selector[id^=my-id-starts-with-]"
        );
        assertActualMatchesExpectedAfterPrefixWrap(
            postCSS,
            path.join(
                __dirname,
                "fixtures",
                "selector-special-characters-raw.css"
            ),
            path.join(
                __dirname,
                "fixtures",
                "selector-special-characters-expected.css"
            )
        );
    });
});
