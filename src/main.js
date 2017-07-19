var postcss = require("postcss");

module.exports = postcss.plugin("postcss-prefixwrap", function (selector, options) {
  "use strict";

  options = options || {};
  return function (css) {
    css.walkRules(function (rule) {
      if (!rule.selector.match(new RegExp("^ *[^ ]*" + selector + ".*$"))) {
        rule.selector = rule.selector
          .split(",")
          .map(function (sel) {
            if (sel.match(/^[\s\S]*(body|html).*$/)) {
              if (options.prefixRootTags) {
                return selector + " ." + sel;
              } else {
                // HTML and Body elements cannot be contained within our container so lets extract their styles
                return sel.trim().replace(/^[\s\S]*(body|html)/, selector);
              }
            } else {
              return selector + " " + sel.trim();
            }
          })
          .filter(function (sel) {
            return sel !== null;
          })
          .join(", ");
      }
    });
  };
});
