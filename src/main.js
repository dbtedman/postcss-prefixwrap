var postcss = require("postcss");

(function () {

  "use strict";

  module.exports = postcss.plugin("postcss-prefixwrap", function (prefixSelector, options) {

    options = options || {};

    function invalidCSSSelectors(cssSelector) {
      return cssSelector !== null;
    }

    function prefixWrapCSSSelector(cssSelector) {
      var isRootTag = /^(body|html).*$/;
      var anyWhitespaceAtBeginningOrEnd = /(^\s*|\s*$)/g;
      var prefixRootTags = options.prefixRootTags;

      // Remove any whitespace characters before or after our selector.
      var cleanSelector = cssSelector.replace(anyWhitespaceAtBeginningOrEnd, "");

      // Selector part may just be a blank line, in this case bail out.
      if (cleanSelector === "") {
        return null;
      }

      // Anything other than a root tag is always prefixed.
      if (!cleanSelector.match(isRootTag)) {
        return prefixSelector + " " + cleanSelector;
      }

      // Handle special case where root tags should be converted into classes rather than being replaced.
      if (prefixRootTags) {
        return prefixSelector + " ." + cleanSelector;
      }

      // HTML and Body elements cannot be contained within our container so lets extract their styles.
      return cleanSelector.replace(/^(body|html)/, prefixSelector);
    }

    function prefixWrapCSSRule(cssRule) {
      var isPrefixSelector = new RegExp("^\s*" + prefixSelector + ".*$");

      // We have found our prefix selector, we just want to leave it as it is already.
      if (!cssRule.selector.match(isPrefixSelector)) {
        cssRule.selector = cssRule.selector
          .split(",")
          .map(prefixWrapCSSSelector)
          .filter(invalidCSSSelectors)
          .join(", ");
      }
    }

    return function (css) {
      css.walkRules(prefixWrapCSSRule);
    };
  });
}());
