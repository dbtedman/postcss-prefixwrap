const Assert = require("assert");
const fs = require("fs");

describe("Gulp Integration", () => {
  it("runs as part of a postcss task", () => {
    Assert.strictEqual(
      fs.readFileSync(
        __dirname + "/fixtures/css/expected/example.css",
        "UTF-8"
      ),
      fs.readFileSync(__dirname + "/.temp/example.css", "UTF-8")
    );
  });
});
