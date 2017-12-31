var postcss = require("postcss");

(function () {

  "use strict";

  function PostCSSPrefixWrap(prefixSelector, options) {
    this.anyWhitespaceAtBeginningOrEnd = /(^\s*|\s*$)/g;
    this.isPrefixSelector = new RegExp("^\s*" + prefixSelector + ".*$");
    this.isRootTag = /^(body|html).*$/;
    this.prefixRootTags = options !== undefined && options.hasOwnProperty("prefixRootTags") ? options.prefixRootTags : false;
    this.prefixSelector = prefixSelector;
  }

  PostCSSPrefixWrap.prototype.invalidCSSSelectors = function (cssSelector) {
    return cssSelector !== null;
  };

  PostCSSPrefixWrap.prototype.prefixWrapCSSSelector = function (cssSelector) {
    var that = this;

    var cleanSelector = cssSelector.replace(that.anyWhitespaceAtBeginningOrEnd, "");

    if (cleanSelector === "") {
      return null;
    }

    // Anything other than a root tag is always prefixed.
    if (!cleanSelector.match(that.isRootTag)) {
      return that.prefixSelector + " " + cleanSelector;
    }

    // Handle special case where root tags should be converted into classes rather than being replaced.
    if (that.prefixRootTags) {
      return that.prefixSelector + " ." + cleanSelector;
    }

    // HTML and Body elements cannot be contained within our container so lets extract their styles.
    return cleanSelector.replace(/^(body|html)/, that.prefixSelector);
  };

  PostCSSPrefixWrap.prototype.prefixWrapCSSRule = function (cssRule) {
    var that = this;

    // We have found our prefix selector, we just want to leave it as it is already.
    if (!cssRule.selector.match(that.isPrefixSelector)) {
      cssRule.selector = cssRule.selector
        .split(",")
        .map(function (cssSelector) {
          return that.prefixWrapCSSSelector(cssSelector);
        })
        .filter(that.invalidCSSSelectors)
        .join(", ");
    }
  };

  PostCSSPrefixWrap.prototype.asPlugin = function () {
    var that = this;

    return function (css) {
      css.walkRules(function (cssRule) {
        that.prefixWrapCSSRule(cssRule);
      });
    };
  };

  module.exports = postcss.plugin("postcss-prefixwrap", function (prefixSelector, options) {
    return new PostCSSPrefixWrap(prefixSelector, options).asPlugin();
  });

}());
