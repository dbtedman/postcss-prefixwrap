import * as path from "path";

import { it } from "@jest/globals";

import { assertActualMatchesExpectedAfterPrefixWrap } from "./support/PrefixAssert";
import { postCSSWithPlugin } from "./support/PluginBootstrap";

const postCSSSkip = postCSSWithPlugin({ prefixRootTags: true });

it("adds prefix to global selectors", () => {
    assertActualMatchesExpectedAfterPrefixWrap(
        postCSSSkip,
        path.join(__dirname, "fixtures", "leave-body-raw.css"),
        path.join(__dirname, "fixtures", "leave-body-expected.css"),
    );
});
