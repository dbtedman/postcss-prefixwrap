import * as path from "path";

import { it } from "@jest/globals";

import { assertActualMatchesExpectedAfterPrefixWrap } from "./support/PrefixAssert";
import { postCSSWithPlugin } from "./support/PluginBootstrap";

const postCSSSkip = postCSSWithPlugin();

it("correctly handles :where selector", () => {
    assertActualMatchesExpectedAfterPrefixWrap(
        postCSSSkip,
        path.join(__dirname, "fixtures", "where-statement-raw.css"),
        path.join(__dirname, "fixtures", "where-statement-expected.css"),
    );
});
