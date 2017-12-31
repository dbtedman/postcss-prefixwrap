var assert = require("assert");
var fs = require("fs");
var postcss = require("postcss");
var prefixWrap = require("../src/main");

describe("PostCSS Prefix Wrap", function () {

  "use strict";

  // Generate a postcss instance with our plugin enabled.
  var postCSS = postcss([prefixWrap(".my-container")]);
  var postCSSSkip = postcss([prefixWrap(".my-container", {prefixRootTags: true})]);

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

    it("adds prefix class for multiple classes", function () {
      assert.equal(
        fs.readFileSync(__dirname + "/fixtures/multiple-classes-expected.css", "UTF-8"),
        postCSS.process(fs.readFileSync(__dirname + "/fixtures/multiple-classes-raw.css", "UTF-8")).css
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

  describe("Prefix html/body tags", function () {
    it("adds prefix to global selectors", function () {
      assert.equal(
        fs.readFileSync(__dirname + "/fixtures/leave-body-expected.css", "UTF-8"),
        postCSSSkip.process(fs.readFileSync(__dirname + "/fixtures/leave-body.css", "UTF-8")).css
      );
    });
  });

  describe("Leave Our Container", function () {
    it("leaves selectors that contain our selector in the left most location", function () {
      assert.equal(
        fs.readFileSync(__dirname + "/fixtures/leave-expected.css", "UTF-8"),
        postCSS.process(fs.readFileSync(__dirname + "/fixtures/leave-raw.css", "UTF-8")).css
      );
    });
  });

  describe("Handle Invalid CSS", function () {
    it("ignores empty selectors", function () {
      assert.equal(
        fs.readFileSync(__dirname + "/fixtures/empty-selectors-expected.css", "UTF-8"),
        postCSS.process(fs.readFileSync(__dirname + "/fixtures/empty-selectors-raw.css", "UTF-8")).css
      );
    });
  });
});
