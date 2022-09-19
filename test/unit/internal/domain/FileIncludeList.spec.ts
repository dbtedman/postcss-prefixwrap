import { shouldIncludeFilePath } from "../../../../src/internal/domain/FileIncludeList";

describe("shouldIncludeFilePath", () => {
  it("handles includeFile with whitelist when missing source input data", () => {
    expect(shouldIncludeFilePath(undefined, [".something"], [])).toStrictEqual(
      false
    );
  });

  it("handles includeFile with blacklist when missing source input data", () => {
    expect(shouldIncludeFilePath(undefined, [], [".something"])).toStrictEqual(
      true
    );
  });
});
