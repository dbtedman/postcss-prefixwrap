import { strictEqual } from "assert";
import { shouldIncludeFilePath } from "../../../../src/internal/domain/FileIncludeList";

describe("shouldIncludeFilePath", () => {
  it("handles includeFile with whitelist when missing source input data", () => {
    strictEqual(shouldIncludeFilePath(undefined, [".something"], []), false);
  });

  it("handles includeFile with blacklist when missing source input data", () => {
    strictEqual(shouldIncludeFilePath(undefined, [], [".something"]), true);
  });
});
