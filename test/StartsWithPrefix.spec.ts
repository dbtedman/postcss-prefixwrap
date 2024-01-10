import * as path from "path";

import { it } from "vitest";

import { assertActualMatchesExpectedAfterPrefixWrap } from "./support/PrefixAssert";
import { postCSSWithPlugin } from "./support/PluginBootstrap";

const postCSSSkip = postCSSWithPlugin({}, ".te");

it("does not get confused", () => {
    assertActualMatchesExpectedAfterPrefixWrap(
        postCSSSkip,
        path.join(__dirname, "fixtures", "starts-with-prefix-raw.css"),
        path.join(__dirname, "fixtures", "starts-with-prefix-expected.css"),
    );
});
