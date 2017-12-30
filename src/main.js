var postcss = require("postcss");

module.exports = postcss.plugin("postcss-prefixwrap", function (prefixSelector, options) {
  "use strict";

  options = options || {};

  var isRootTag = /^(body|html).*$/;
  var isPrefixSelector = new RegExp("^\s*" + prefixSelector + ".*$");
  var anyWhitespaceAtBeginningOrEnd = /(^\s*|\s*$)/g;

  return function (css) {
    css.walkRules(function (rule) {
      // We have found our prefix selector, we just want to leave it as it is already.
      if (!rule.selector.match(isPrefixSelector)) {
        rule.selector = rule.selector
          .split(",")
          .map(function (sel) {
            // Remove any whitespace characters before or after our selector.
            var cleanSelector = sel.replace(anyWhitespaceAtBeginningOrEnd, "");

            // Selector part may just be a blank line, in this case bail out.
            if (cleanSelector === "") {
              return null;
            }

            // Anything other than a root tag is always prefixed.
            if (!cleanSelector.match(isRootTag)) {
              return prefixSelector + " " + cleanSelector;
            }

            // Handle special case where root tags should be converted into classes rather than being replaced.
            if (options.prefixRootTags) {
              return prefixSelector + " ." + cleanSelector;
            }

            // HTML and Body elements cannot be contained within our container so lets extract their styles.
            return cleanSelector.replace(/^(body|html)/, prefixSelector);
          })
          .filter(function (sel) {
            return sel !== null;
          })
          .join(", ");
      }
    });
  };
});
