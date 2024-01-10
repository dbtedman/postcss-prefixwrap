import * as path from "path";

import { it } from "vitest";

import { assertActualMatchesExpectedAfterPrefixWrap } from "./support/PrefixAssert";
import { postCSSWithPlugin } from "./support/PluginBootstrap";

const postCSS = postCSSWithPlugin();

it("ignores selectors that are percentages", () => {
    assertActualMatchesExpectedAfterPrefixWrap(
        postCSS,
        path.join(__dirname, "fixtures", "keyframes-raw.css"),
        path.join(__dirname, "fixtures", "keyframes-expected.css"),
    );
});
