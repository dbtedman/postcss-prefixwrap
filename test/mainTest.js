var assert = require("assert");
var fs = require("fs");
var postcss = require("postcss");
var prefixWrap = require("../src/main");

describe("PostCSS Prefix Wrap", function () {

  "use strict";

  var postCSS = postcss([prefixWrap(".my-container")]);

  describe("Standard Prefixing", function () {
    it("adds prefix class for tags", function () {
      assert.equal(
        fs.readFileSync(__dirname + "/fixtures/standard-tags-expected.css", "UTF-8"),
        postCSS.process(fs.readFileSync(__dirname + "/fixtures/standard-tags-raw.css", "UTF-8")).css
      );
    });

    it("adds prefix class for ids", function () {
      assert.equal(
        fs.readFileSync(__dirname + "/fixtures/standard-ids-expected.css", "UTF-8"),
        postCSS.process(fs.readFileSync(__dirname + "/fixtures/standard-ids-raw.css", "UTF-8")).css
      );
    });

    it("adds prefix class for classes", function () {
      assert.equal(
        fs.readFileSync(__dirname + "/fixtures/standard-classes-expected.css", "UTF-8"),
        postCSS.process(fs.readFileSync(__dirname + "/fixtures/standard-classes-raw.css", "UTF-8")).css
      );
    });
  });

  describe("Replacement Prefixing", function () {
    it("replaces global selectors with prefix", function () {
      assert.equal(
        fs.readFileSync(__dirname + "/fixtures/replacement-tags-expected.css", "UTF-8"),
        postCSS.process(fs.readFileSync(__dirname + "/fixtures/replacement-tags-raw.css", "UTF-8")).css
      );
    });
  });
});
