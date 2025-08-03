import * as path from "path";

import { it } from "@jest/globals";

import { assertActualMatchesExpectedAfterPrefixWrap } from "./support/PrefixAssert";
import { postCSSWithPlugin } from "./support/PluginBootstrap";

const postCSS = postCSSWithPlugin();

it("avoid prefixing nested classes", () => {
    assertActualMatchesExpectedAfterPrefixWrap(
        postCSS,
        path.join(__dirname, "fixtures", "nested-css-classes-raw.css"),
        path.join(__dirname, "fixtures", "nested-css-classes-expected.css"),
    );
});
