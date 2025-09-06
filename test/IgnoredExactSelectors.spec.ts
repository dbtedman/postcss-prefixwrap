import * as path from "path";

import { it } from "@jest/globals";

import { assertActualMatchesExpectedAfterPrefixWrap } from "./support/PrefixAssert";
import { postCSSWithPlugin } from "./support/PluginBootstrap";

const postCSSIgnore = postCSSWithPlugin({
    ignoredSelectors: ["body"],
});

it("ignores selectors that are in a ignore list exactly when string", () => {
    assertActualMatchesExpectedAfterPrefixWrap(
        postCSSIgnore,
        path.join(__dirname, "fixtures", "ignore-exact-selectors-raw.css"),
        path.join(__dirname, "fixtures", "ignore-exact-selectors-expected.css"),
    );
});
