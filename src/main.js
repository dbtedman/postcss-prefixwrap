const PostCSS = require("postcss");

class PostCSSPrefixWrap {
  /**
   * @param {String} prefixSelector
   * @param {Object} options
   */
  constructor(prefixSelector, options) {
    this.anyWhitespaceAtBeginningOrEnd = /(^\s*|\s*$)/g;
    // eslint-disable-next-line no-useless-escape
    this.isPrefixSelector = new RegExp("^s*" + prefixSelector + ".*$");
    this.isRootTag = /^(body|html).*$/;
    this.prefixRootTags =
      options !== undefined && options.hasOwnProperty("prefixRootTags")
        ? options.prefixRootTags
        : false;
    this.prefixSelector = prefixSelector;
  }

  /**
   * @param {String} cssSelector
   * @returns {Boolean}
   */
  invalidCSSSelectors(cssSelector) {
    return cssSelector !== null;
  }

  /**
   * @param cssSelector
   * @param cssRule
   * @returns {null|String}
   */
  prefixWrapCSSSelector(cssSelector, cssRule) {
    const cleanSelector = cssSelector.replace(
      this.anyWhitespaceAtBeginningOrEnd,
      ""
    );

    if (cleanSelector === "") {
      return null;
    }

    if (
      cssRule.parent.type === "atrule" &&
      [
        "keyframes",
        "-webkit-keyframes",
        "-moz-keyframes",
        "-o-keyframes"
      ].indexOf(cssRule.parent.name) !== -1
    ) {
      return cleanSelector;
    }

    // Anything other than a root tag is always prefixed.
    if (!cleanSelector.match(this.isRootTag)) {
      return this.prefixSelector + " " + cleanSelector;
    }

    // Handle special case where root tags should be converted into classes
    // rather than being replaced.
    if (this.prefixRootTags) {
      return this.prefixSelector + " ." + cleanSelector;
    }

    // HTML and Body elements cannot be contained within our container so lets
    // extract their styles.
    return cleanSelector.replace(/^(body|html)/, this.prefixSelector);
  }

  /**
   * @param {*} cssRule
   */
  prefixWrapCSSRule(cssRule) {
    // We have found our prefix selector, we just want to leave it as it is already.
    if (!cssRule.selector.match(this.isPrefixSelector)) {
      cssRule.selector = cssRule.selector
        .split(",")
        .map(cssSelector => {
          return this.prefixWrapCSSSelector(cssSelector, cssRule);
        })
        .filter(this.invalidCSSSelectors)
        .join(", ");
    }
  }

  asPlugin() {
    return css => {
      css.walkRules(cssRule => {
        this.prefixWrapCSSRule(cssRule);
      });
    };
  }
}

// Expose our class as a PostCSS Plugin.
module.exports = PostCSS.plugin(
  "postcss-prefixwrap",
  (prefixSelector, options) => {
    return new PostCSSPrefixWrap(prefixSelector, options).asPlugin();
  }
);
