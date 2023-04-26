import * as path from "path";

import { describe, it } from "@jest/globals";

import { assertActualMatchesExpectedAfterPrefixWrap } from "./support/PrefixAssert";
import { postCSSWithPlugin } from "./support/PluginBootstrap";

describe("Acceptance: Leave Keyframe Percentages", () => {
    const postCSS = postCSSWithPlugin();

    it("ignores selectors that are percentages", () => {
        assertActualMatchesExpectedAfterPrefixWrap(
            postCSS,
            path.join(__dirname, "fixtures", "keyframes-raw.css"),
            path.join(__dirname, "fixtures", "keyframes-expected.css")
        );
    });
});
