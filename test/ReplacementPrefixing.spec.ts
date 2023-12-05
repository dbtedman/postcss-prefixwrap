import * as path from "path";

import { it } from "@jest/globals";

import { assertActualMatchesExpectedAfterPrefixWrap } from "./support/PrefixAssert";
import { postCSSWithPlugin } from "./support/PluginBootstrap";

const postCSS = postCSSWithPlugin();

it("replaces global selectors with prefix", () => {
    assertActualMatchesExpectedAfterPrefixWrap(
        postCSS,
        path.join(__dirname, "fixtures", "replacement-tags-raw.css"),
        path.join(__dirname, "fixtures", "replacement-tags-expected.css"),
    );
});
