import PostCSS from "postcss";

import {
  cleanSelector,
  cssRuleMatchesPrefixSelector,
  isNotRootTag,
  isValidCSSSelector,
} from "../../../../src/internal/domain/CSSSelector";

describe("isValidCSSSelector", () => {
  it("is true for null Selector", () => {
    expect(isValidCSSSelector(null)).toStrictEqual(false);
  });
});

describe("cleanSelector", () => {
  it("removes extra space padding", () => {
    expect(cleanSelector(" div ")).toStrictEqual("div");
    expect(cleanSelector(" div")).toStrictEqual("div");
    expect(cleanSelector("div ")).toStrictEqual("div");
  });
});

describe("isNotRootTag", () => {
  it("is true for root tags", () => {
    expect(isNotRootTag("html")).toStrictEqual(false);
    expect(isNotRootTag("body")).toStrictEqual(false);
    expect(isNotRootTag(":root")).toStrictEqual(false);
  });

  it("is false for non root tags", () => {
    expect(isNotRootTag("div")).toStrictEqual(true);
    expect(isNotRootTag("p")).toStrictEqual(true);
    expect(isNotRootTag("span")).toStrictEqual(true);
  });
});

describe("cssRuleMatchesPrefixSelector", () => {
  it("correctly identifies our prefix Selector", () => {
    const prefixSelector = ".my-custom-wrap";
    const cssRule = PostCSS.rule({
      selector: prefixSelector,
    });

    expect(cssRuleMatchesPrefixSelector(cssRule, prefixSelector)).toStrictEqual(
      true
    );
  });

  it("correctly ignores selector that contains our prefix selector", () => {
    const prefixSelector = ".my-custom-wrap";
    const selector = `${prefixSelector}something`;
    const cssRule = PostCSS.rule({
      selector: selector,
    });

    expect(cssRuleMatchesPrefixSelector(cssRule, prefixSelector)).toStrictEqual(
      false
    );
  });

  it("correctly ignores another Selector", () => {
    const prefixSelector = ".my-custom-wrap";
    const selector = ".not-my-custom-wrap";
    const cssRule = PostCSS.rule({ selector: selector });

    expect(cssRuleMatchesPrefixSelector(cssRule, prefixSelector)).toStrictEqual(
      false
    );
  });
});
