import * as postcss from "postcss";

const Assert = require("assert");
const FileSystem = require("fs");

export default class PrefixAssert {
  static actualMatchesExpectedAfterPrefixWrap(
    postCSS: postcss.Processor,
    actualPath: string,
    expectedPath: string
  ) {
    Assert.strictEqual(
      postCSS.process(FileSystem.readFileSync(actualPath)).css,
      FileSystem.readFileSync(expectedPath, "UTF-8")
    );
  }
}
