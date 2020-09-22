import indexWrap from "./indexWrap";
import * as postcss8 from "postcss";
import * as postcss7 from "postcss7";

describe("indexWrap", () => {
  it("works with PostCSS v8", () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const plugin = indexWrap(postcss8)(".selector", {});
    plugin.Root({
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
