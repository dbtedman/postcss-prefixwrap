const assert = require("assert");
const fs = require("fs");

describe("Gulp Integration", () => {
  // TODO: This test requires gulp to have been run first. (This will be fixed soon to run Gulp from here)

  it("runs as part of a postcss task", () => {
    assert.equal(
      fs.readFileSync(
        __dirname + "/fixtures/css/expected/example.css",
        "UTF-8"
      ),
      fs.readFileSync(__dirname + "/.temp/example.css", "UTF-8")
    );
  });
});
