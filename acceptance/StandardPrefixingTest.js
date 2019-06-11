const PostCSS = require("postcss");

const PrefixWrap = require("../src/main");
const PrefixAssert = require("./support/prefix-assert");

// Generate a postcss instance with our plugin enabled.
const postCSS = PostCSS([PrefixWrap(".my-container")]);
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
