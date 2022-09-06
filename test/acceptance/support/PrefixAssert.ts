import Assert from "assert";
import FileSystem from "fs";
import Processor from "postcss/lib/processor";

export default class PrefixAssert {
  static actualMatchesExpectedAfterPrefixWrap(
    postCSS: Processor,
    actualPath: string,
    expectedPath: string
  ): void {
    Assert.strictEqual(
      postCSS.process(FileSystem.readFileSync(actualPath), { from: actualPath })
        .css,
      FileSystem.readFileSync(expectedPath, "utf8")
    );
  }

  static noChangeAfterPrefixWrap(postCSS: Processor, actualPath: string): void {
    PrefixAssert.actualMatchesExpectedAfterPrefixWrap(
      postCSS,
      actualPath,
      actualPath
    );
  }
}
