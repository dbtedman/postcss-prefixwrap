import * as path from "path";

import { it } from "@jest/globals";

import { assertActualMatchesExpectedAfterPrefixWrap } from "./support/PrefixAssert";
import { postCSSWithPlugin } from "./support/PluginBootstrap";

it("adds compound prefix class", () => {
    const postCSS = postCSSWithPlugin({
        appendCompoundSelector: true,
    });

    assertActualMatchesExpectedAfterPrefixWrap(
        postCSS,
        path.join(__dirname, "fixtures", "compound-prefix-raw.css"),
        path.join(__dirname, "fixtures", "compound-prefix-expected.css"),
    );
});

it("adds compound prefix class with prefix root tags", () => {
    const postCSS = postCSSWithPlugin({
        appendCompoundSelector: true,
        prefixRootTags: true,
    });

    assertActualMatchesExpectedAfterPrefixWrap(
        postCSS,
        path.join(__dirname, "fixtures", "compound-prefix-root-tags-raw.css"),
        path.join(
            __dirname,
            "fixtures",
            "compound-prefix-root-tags-expected.css",
        ),
    );
});
