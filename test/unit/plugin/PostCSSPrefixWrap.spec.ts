import { strictEqual } from "assert";

import PostCSSPrefixWrap from "../../../src/plugin/PostCSSPrefixWrap";

describe("Plugin", () => {
  const prefixSelector = ".my-custom-wrap";

  it("handles includeFile with whitelist when missing source input data", () => {
    const plugin = new PostCSSPrefixWrap(prefixSelector, {
      whitelist: [".something"],
    });

    strictEqual(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      plugin.includeFile({
        source: undefined,
      }),
      false
    );

    strictEqual(
      plugin.includeFile({
        walkRules(): void {
          //
        },
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        source: {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          input: {
            file: undefined,
          },
        },
      }),
      false
    );
  });

  it("handles includeFile with blacklist when missing source input data", () => {
    const plugin = new PostCSSPrefixWrap(prefixSelector, {
      blacklist: [".something"],
    });

    strictEqual(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      plugin.includeFile({
        source: undefined,
      }),
      true
    );

    strictEqual(
      plugin.includeFile({
        walkRules(): void {
          //
        },
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        source: {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          input: {
            file: undefined,
          },
        },
      }),
      true
    );
  });
});
