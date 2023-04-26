import { describe, expect, it } from "@jest/globals";
import * as postcss8 from "postcss";
import * as postcss7 from "postcss7";

import indexWrap from "../../../src/plugin/PostCSSPlugin";

describe("indexWrap", () => {
    it("works with PostCSS v8", () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const plugin = indexWrap(postcss8)(".selector", {});
        plugin.Once({
            walkRules: () => {
                // Implementation not important for this test
            },
        });
        expect(plugin).not.toBeNull();
    });

    it("works with PostCSS v7", () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const plugin = indexWrap(postcss7)(".selector", {});
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        plugin({
            walkRules: () => {
                // Implementation not important for this test
            },
        });
        expect(plugin).not.toBeNull();
    });
});
