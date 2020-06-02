import * as postcss from "postcss";
import Assert from "assert";
import FileSystem from "fs";

export default class PrefixAssert {
  static actualMatchesExpectedAfterPrefixWrap(
    postCSS: postcss.Processor,
    actualPath: string,
    expectedPath: string
  ): void {
    Assert.strictEqual(
      postCSS.process(FileSystem.readFileSync(actualPath), { from: actualPath })
        .css,
      FileSystem.readFileSync(expectedPath, "utf8")
    );
  }

  static noChangeAfterPrefixWrap(
    postCSS: postcss.Processor,
    actualPath: string
  ): void {
    PrefixAssert.actualMatchesExpectedAfterPrefixWrap(
      postCSS,
      actualPath,
      actualPath
    );
  }
}
