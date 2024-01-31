import * as path from "path";

import { it } from "@jest/globals";

import { assertActualMatchesExpectedAfterPrefixWrap } from "./support/PrefixAssert";
import { postCSSWithPlugin } from "./support/PluginBootstrap";

const postCSS = postCSSWithPlugin({
    appendCompoundSelector: true,
});

it("adds compound prefix class", () => {
    assertActualMatchesExpectedAfterPrefixWrap(
        postCSS,
        path.join(__dirname, "fixtures", "compound-prefix-raw.css"),
        path.join(__dirname, "fixtures", "compound-prefix-expected.css"),
    );
});
