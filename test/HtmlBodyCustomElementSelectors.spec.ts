import { it, describe } from "@jest/globals";
import { assertActualMatchesExpectedAfterPrefixWrap } from "./support/PrefixAssert";
import path from "path";
import { postCSSWithPlugin } from "./support/PluginBootstrap";

describe("Correctly prefixes custom element selectors", () => {
    it("using '.wrap' selector", () => {
        assertActualMatchesExpectedAfterPrefixWrap(
            postCSSWithPlugin({}, ".wrap"),
            path.join(
                __dirname,
                "fixtures",
                "html-body-custom-element-selectors-raw.css",
            ),
            path.join(
                __dirname,
                "fixtures",
                "html-body-custom-element-selectors-first-expected.css",
            ),
        );
    });

    it("using '[data-scope]' selector", () => {
        assertActualMatchesExpectedAfterPrefixWrap(
            postCSSWithPlugin({}, "[data-scope]"),
            path.join(
                __dirname,
                "fixtures",
                "html-body-custom-element-selectors-raw.css",
            ),
            path.join(
                __dirname,
                "fixtures",
                "html-body-custom-element-selectors-second-expected.css",
            ),
        );
    });

    it("using '.wrap' selector, along with prefixRootTags option", () => {
        assertActualMatchesExpectedAfterPrefixWrap(
            postCSSWithPlugin({ prefixRootTags: true }, ".wrap"),
            path.join(
                __dirname,
                "fixtures",
                "html-body-custom-element-selectors-raw.css",
            ),
            path.join(
                __dirname,
                "fixtures",
                "html-body-custom-element-selectors-third-expected.css",
            ),
        );
    });
});
