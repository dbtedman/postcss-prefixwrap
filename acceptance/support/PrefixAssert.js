const Assert = require("assert");
const FileSystem = require("fs");

class PrefixAssert {
  /**
   * @param {postcss.Processor} postCSS
   * @param {String} actualPath
   * @param {String} expectedPath
   */
  static actualMatchesExpectedAfterPrefixWrap(
    postCSS,
    actualPath,
    expectedPath
  ) {
    Assert.strictEqual(
      postCSS.process(FileSystem.readFileSync(actualPath)).css,
      FileSystem.readFileSync(expectedPath, "UTF-8")
    );
  }
}

module.exports = PrefixAssert;
