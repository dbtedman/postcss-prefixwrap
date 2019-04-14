const PostCSS = require("postcss");

const PrefixWrap = require("../src/main");
const PrefixAssert = require("./support/prefix-assert");

describe("PostCSS Prefix Wrap", () => {
  // Generate a postcss instance with our plugin enabled.
  const postCSS = PostCSS([PrefixWrap(".my-container")]);
  const postCSSSkip = PostCSS([
    PrefixWrap(".my-container", { prefixRootTags: true })
  ]);
  const fixtures = __dirname + "/fixtures";

  describe("Standard Prefixing", () => {
    it("adds prefix class for tags", () => {
      PrefixAssert.actualMatchesExpectedAfterPrefixWrap(
        postCSS,
        fixtures + "/standard-tags-raw.css",
        fixtures + "/standard-tags-expected.css"
      );
    });

    it("adds prefix class for ids", () => {
      PrefixAssert.actualMatchesExpectedAfterPrefixWrap(
        postCSS,
        fixtures + "/standard-ids-raw.css",
        fixtures + "/standard-ids-expected.css"
      );
    });

    it("adds prefix class for classes", () => {
      PrefixAssert.actualMatchesExpectedAfterPrefixWrap(
        postCSS,
        fixtures + "/standard-classes-raw.css",
        fixtures + "/standard-classes-expected.css"
      );
    });

    it("adds prefix class for multiple classes", () => {
      PrefixAssert.actualMatchesExpectedAfterPrefixWrap(
        postCSS,
        fixtures + "/multiple-classes-raw.css",
        fixtures + "/multiple-classes-expected.css"
      );
    });
  });

  describe("Replacement Prefixing", () => {
    it("replaces global selectors with prefix", () => {
      PrefixAssert.actualMatchesExpectedAfterPrefixWrap(
        postCSS,
        fixtures + "/replacement-tags-raw.css",
        fixtures + "/replacement-tags-expected.css"
      );
    });
  });

  describe("Prefix html/body tags", () => {
    it("adds prefix to global selectors", () => {
      PrefixAssert.actualMatchesExpectedAfterPrefixWrap(
        postCSSSkip,
        fixtures + "/leave-body-raw.css",
        fixtures + "/leave-body-expected.css"
      );
    });
  });

  describe("Leave Our Container", () => {
    it("leaves selectors that contain our selector in the left most location", () => {
      PrefixAssert.actualMatchesExpectedAfterPrefixWrap(
        postCSS,
        fixtures + "/leave-raw.css",
        fixtures + "/leave-expected.css"
      );
    });
  });

  describe("Handle Invalid CSS", () => {
    it("ignores empty selectors", () => {
      PrefixAssert.actualMatchesExpectedAfterPrefixWrap(
        postCSS,
        fixtures + "/empty-selectors-raw.css",
        fixtures + "/empty-selectors-expected.css"
      );
    });
  });

  describe("Leave Keyframe Percentages", () => {
    it("ignores selectors that are percentages", () => {
      PrefixAssert.actualMatchesExpectedAfterPrefixWrap(
        postCSS,
        fixtures + "/keyframes-raw.css",
        fixtures + "/keyframes-expected.css"
      );
    });
  });
});
