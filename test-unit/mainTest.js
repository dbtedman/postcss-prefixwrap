var assert = require("assert");
var fs = require("fs");
var postcss = require("postcss");
var prefixWrap = require("../src/main");

describe("PostCSS Prefix Wrap", function () {

  "use strict";

  // Generate a postcss instance with our plugin enabled.
  var postCSS = postcss([prefixWrap(".my-container")]);
  var postCSSSkip = postcss([prefixWrap(".my-container", {prefixRootTags: true})]);
  var fixtures = __dirname + "/fixtures";

  function assertActualMatchesExpectedAfterPrefixWrap(postCSS, actualPath, expectedPath) {
    assert.equal(postCSS.process(fs.readFileSync(actualPath)).css, fs.readFileSync(expectedPath, "UTF-8"));
  }

  describe("Standard Prefixing", function () {
    it("adds prefix class for tags", function () {
      assertActualMatchesExpectedAfterPrefixWrap(postCSS, fixtures + "/standard-tags-raw.css", fixtures + "/standard-tags-expected.css");
    });

    it("adds prefix class for ids", function () {
      assertActualMatchesExpectedAfterPrefixWrap(postCSS, fixtures + "/standard-ids-raw.css", fixtures + "/standard-ids-expected.css");
    });

    it("adds prefix class for classes", function () {
      assertActualMatchesExpectedAfterPrefixWrap(postCSS, fixtures + "/standard-classes-raw.css", fixtures + "/standard-classes-expected.css");
    });

    it("adds prefix class for multiple classes", function () {
      assertActualMatchesExpectedAfterPrefixWrap(postCSS, fixtures + "/multiple-classes-raw.css", fixtures + "/multiple-classes-expected.css");
    });
  });

  describe("Replacement Prefixing", function () {
    it("replaces global selectors with prefix", function () {
      assertActualMatchesExpectedAfterPrefixWrap(postCSS, fixtures + "/replacement-tags-raw.css", fixtures + "/replacement-tags-expected.css");
    });
  });

  describe("Prefix html/body tags", function () {
    it("adds prefix to global selectors", function () {
      assertActualMatchesExpectedAfterPrefixWrap(postCSSSkip, fixtures + "/leave-body-raw.css", fixtures + "/leave-body-expected.css");
    });
  });

  describe("Leave Our Container", function () {
    it("leaves selectors that contain our selector in the left most location", function () {
      assertActualMatchesExpectedAfterPrefixWrap(postCSS, fixtures + "/leave-raw.css", fixtures + "/leave-expected.css");
    });
  });

  describe("Handle Invalid CSS", function () {
    it("ignores empty selectors", function () {
      assertActualMatchesExpectedAfterPrefixWrap(postCSS, fixtures + "/empty-selectors-raw.css", fixtures + "/empty-selectors-expected.css");
    });
  });
});
