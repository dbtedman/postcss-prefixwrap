import path from "path";

import { it } from "vitest";

import { assertActualMatchesExpectedAfterPrefixWrap } from "./support/PrefixAssert";

import { postCSSWithPlugin } from "./support/PluginBootstrap";

it("handles .my-custom-selector[id^=my-id-starts-with-]", () => {
    const postCSS = postCSSWithPlugin(
        {},
        ".my-custom-selector[id^=my-id-starts-with-]",
    );
    assertActualMatchesExpectedAfterPrefixWrap(
        postCSS,
        path.join(__dirname, "fixtures", "selector-special-characters-raw.css"),
        path.join(
            __dirname,
            "fixtures",
            "selector-special-characters-expected.css",
        ),
    );
});
