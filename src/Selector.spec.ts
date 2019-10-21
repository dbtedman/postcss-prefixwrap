import Assert from "assert";

import Selector from "./Selector";

describe("Selector", () => {
  it("Selector.isValid() is true for null Selector", () => {
    Assert.strictEqual(Selector.isValid(null), false);
  });

  it("Selector.clean() removes extra space padding", () => {
    Assert.strictEqual(Selector.clean(" div "), "div");
    Assert.strictEqual(Selector.clean(" div"), "div");
    Assert.strictEqual(Selector.clean("div "), "div");
  });

  it("Selector.isNotRootTag() is true for root tags", () => {
    Assert.strictEqual(Selector.isNotRootTag("html"), false);
    Assert.strictEqual(Selector.isNotRootTag("body"), false);
  });

  it("Selector.isNotRootTag() is false for non root tags", () => {
    Assert.strictEqual(Selector.isNotRootTag("div"), true);
    Assert.strictEqual(Selector.isNotRootTag("p"), true);
    Assert.strictEqual(Selector.isNotRootTag("span"), true);
  });
});
