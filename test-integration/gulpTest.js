var assert = require("assert");
var fs = require("fs");

describe("Gulp Integration", function () {

  "use strict";

  // TODO: This test rquires gulp to have been run first. (This will be fixed soon to run Gulp from here)

  it("runs as part of a postcss task", function () {
    assert.equal(
      fs.readFileSync(__dirname + "/fixtures/css/expected/example.css", "UTF-8"),
      fs.readFileSync(__dirname + "/.temp/example.css", "UTF-8")
    );
  });

});
