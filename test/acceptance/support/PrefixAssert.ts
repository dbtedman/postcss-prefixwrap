import fs from "fs";

import { expect } from "@jest/globals";
import Processor from "postcss/lib/processor";

export const assertNoChangeAfterPrefixWrap = (
    postCSS: Processor,
    actualPath: string
) =>
    assertActualMatchesExpectedAfterPrefixWrap(postCSS, actualPath, actualPath);

export const assertActualMatchesExpectedAfterPrefixWrap = (
    postCSS: Processor,
    actualPath: string,
    expectedPath: string
) =>
    expect(
        postCSS.process(fs.readFileSync(actualPath), { from: actualPath }).css
    ).toEqual(fs.readFileSync(expectedPath, "utf8"));
