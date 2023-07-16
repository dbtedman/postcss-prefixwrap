import * as path from "path";

import { describe, it } from "@jest/globals";

import {
    assertActualMatchesExpectedAfterPrefixWrap,
    assertNoChangeAfterPrefixWrap,
} from "./support/PrefixAssert";
import { postCSSWithPlugin } from "./support/PluginBootstrap";

describe("Acceptance: Blacklist", () => {
    const postCSS = postCSSWithPlugin({
        blacklist: ["standard-classes-raw.css"],
    });

    it("ignores file in blacklist", () => {
        assertNoChangeAfterPrefixWrap(
            postCSS,
            path.join(__dirname, "fixtures", "standard-classes-raw.css"),
        );
    });

    it("prefixes non blacklisted file", () => {
        assertActualMatchesExpectedAfterPrefixWrap(
            postCSS,
            path.join(__dirname, "fixtures", "standard-tags-raw.css"),
            path.join(__dirname, "fixtures", "standard-tags-expected.css"),
        );
    });
});
