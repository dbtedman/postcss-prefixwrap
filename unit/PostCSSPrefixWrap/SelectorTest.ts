const Assert = require("assert");

import Selector from "../../src/PostCSSPrefixWrap/Selector";

describe("Unit: PostCSSPrefixWrap/Selector.js", () => {
  it("isValid() is true for null Selector", () => {
    Assert.strictEqual(Selector.isValid(null), false);
  });

  it("clean() removes extra space padding", () => {
    Assert.strictEqual(Selector.clean(" div "), "div");
    Assert.strictEqual(Selector.clean(" div"), "div");
    Assert.strictEqual(Selector.clean("div "), "div");
  });

  it("isNotRootTag() is true for root tags", () => {
    Assert.strictEqual(Selector.isNotRootTag("html"), false);
    Assert.strictEqual(Selector.isNotRootTag("body"), false);
  });

  it("isNotRootTag() is false for non root tags", () => {
    Assert.strictEqual(Selector.isNotRootTag("div"), true);
    Assert.strictEqual(Selector.isNotRootTag("p"), true);
    Assert.strictEqual(Selector.isNotRootTag("span"), true);
  });
});
