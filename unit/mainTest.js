const assert = require("assert");
const fs = require("fs");
const postcss = require("postcss");

const prefixWrap = require("../src/main");

describe("PostCSS Prefix Wrap", () => {
  // Generate a postcss instance with our plugin enabled.
  const postCSS = postcss([prefixWrap(".my-container")]);
  const postCSSSkip = postcss([
    prefixWrap(".my-container", { prefixRootTags: true })
  ]);
  const fixtures = __dirname + "/fixtures";

  function assertActualMatchesExpectedAfterPrefixWrap(
    postCSS,
    actualPath,
    expectedPath
  ) {
    assert.equal(
      postCSS.process(fs.readFileSync(actualPath)).css,
      fs.readFileSync(expectedPath, "UTF-8")
    );
  }

  describe("Standard Prefixing", () => {
    it("adds prefix class for tags", () => {
      assertActualMatchesExpectedAfterPrefixWrap(
        postCSS,
        fixtures + "/standard-tags-raw.css",
        fixtures + "/standard-tags-expected.css"
      );
    });

    it("adds prefix class for ids", () => {
      assertActualMatchesExpectedAfterPrefixWrap(
        postCSS,
        fixtures + "/standard-ids-raw.css",
        fixtures + "/standard-ids-expected.css"
      );
    });

    it("adds prefix class for classes", () => {
      assertActualMatchesExpectedAfterPrefixWrap(
        postCSS,
        fixtures + "/standard-classes-raw.css",
        fixtures + "/standard-classes-expected.css"
      );
    });

    it("adds prefix class for multiple classes", () => {
      assertActualMatchesExpectedAfterPrefixWrap(
        postCSS,
        fixtures + "/multiple-classes-raw.css",
        fixtures + "/multiple-classes-expected.css"
      );
    });
  });

  describe("Replacement Prefixing", () => {
    it("replaces global selectors with prefix", () => {
      assertActualMatchesExpectedAfterPrefixWrap(
        postCSS,
        fixtures + "/replacement-tags-raw.css",
        fixtures + "/replacement-tags-expected.css"
      );
    });
  });

  describe("Prefix html/body tags", () => {
    it("adds prefix to global selectors", () => {
      assertActualMatchesExpectedAfterPrefixWrap(
        postCSSSkip,
        fixtures + "/leave-body-raw.css",
        fixtures + "/leave-body-expected.css"
      );
    });
  });

  describe("Leave Our Container", () => {
    it("leaves selectors that contain our selector in the left most location", () => {
      assertActualMatchesExpectedAfterPrefixWrap(
        postCSS,
        fixtures + "/leave-raw.css",
        fixtures + "/leave-expected.css"
      );
    });
  });

  describe("Handle Invalid CSS", () => {
    it("ignores empty selectors", () => {
      assertActualMatchesExpectedAfterPrefixWrap(
        postCSS,
        fixtures + "/empty-selectors-raw.css",
        fixtures + "/empty-selectors-expected.css"
      );
    });
  });

  describe("Leave Keyframe Percentages", () => {
    it("ignores selectors that are percentages", () => {
      assertActualMatchesExpectedAfterPrefixWrap(
        postCSS,
        fixtures + "/keyframes-raw.css",
        fixtures + "/keyframes-expected.css"
      );
    });
  });
});
