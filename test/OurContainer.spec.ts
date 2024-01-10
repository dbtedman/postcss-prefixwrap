import * as path from "path";

import { it } from "vitest";

import { assertActualMatchesExpectedAfterPrefixWrap } from "./support/PrefixAssert";
import { postCSSWithPlugin } from "./support/PluginBootstrap";

const postCSS = postCSSWithPlugin();

it("leaves selectors that contain our Selector in the left most location", () => {
    assertActualMatchesExpectedAfterPrefixWrap(
        postCSS,
        path.join(__dirname, "fixtures", "leave-raw.css"),
        path.join(__dirname, "fixtures", "leave-expected.css"),
    );
});
