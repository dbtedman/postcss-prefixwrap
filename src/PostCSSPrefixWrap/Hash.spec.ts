import Assert from "assert";
import Hash from "./Hash";

describe("Hash", () => {
  it("finds value that exists", () => {
    const key = "thing";
    const value = "other";
    const data = {
      [key]: value
    };

    Assert.strictEqual(Hash.value(data, key), value);
  });
});
