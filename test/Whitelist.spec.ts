import * as path from "path";

import { it } from "@jest/globals";

import {
    assertActualMatchesExpectedAfterPrefixWrap,
    assertNoChangeAfterPrefixWrap,
} from "./support/PrefixAssert";
import { postCSSWithPlugin } from "./support/PluginBootstrap";

const postCSS = postCSSWithPlugin({
    whitelist: ["standard-tags-raw.css"],
});

it("ignores file not whitelisted", () => {
    assertNoChangeAfterPrefixWrap(
        postCSS,
        path.join(__dirname, "fixtures", "standard-classes-raw.css"),
    );
});

it("prefixes whitelisted file", () => {
    assertActualMatchesExpectedAfterPrefixWrap(
        postCSS,
        path.join(__dirname, "fixtures", "standard-tags-raw.css"),
        path.join(__dirname, "fixtures", "standard-tags-expected.css"),
    );
});
