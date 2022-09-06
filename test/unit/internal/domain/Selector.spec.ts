import { strictEqual } from "assert";

import Selector from "../../../../src/internal/domain/Selector";

describe("Selector", () => {
  it("Selector.isValid() is true for null Selector", () => {
    strictEqual(Selector.isValid(null), false);
  });

  it("Selector.clean() removes extra space padding", () => {
    strictEqual(Selector.clean(" div "), "div");
    strictEqual(Selector.clean(" div"), "div");
    strictEqual(Selector.clean("div "), "div");
  });

  it("Selector.isNotRootTag() is true for root tags", () => {
    strictEqual(Selector.isNotRootTag("html"), false);
    strictEqual(Selector.isNotRootTag("body"), false);
    strictEqual(Selector.isNotRootTag(":root"), false);
  });

  it("Selector.isNotRootTag() is false for non root tags", () => {
    strictEqual(Selector.isNotRootTag("div"), true);
    strictEqual(Selector.isNotRootTag("p"), true);
    strictEqual(Selector.isNotRootTag("span"), true);
  });
});
