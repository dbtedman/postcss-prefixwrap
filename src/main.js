var postcss = require("postcss");

module.exports = postcss.plugin("postcss-prefixwrap", function (selector) {

  "use strict";

  return function (css) {
    css.walkRules(function (rule) {

      // HTML and Body elements cannot be contained within our container so lets extract their styles
      // and make them the styles of our container.
      if (rule.selector.match(/^ *(body|html).*$/)) {
        rule.selector = rule.selector.replace(/^ *(body|html)/, selector);

      // Prepend selector unless our first rule is a combination of this selector and another rule.
      } else if (!rule.selector.match(new RegExp("^ *[^ ]*" + selector + ".*$"))) {
        rule.selector = selector + " " + rule.selector;
      }
    });
  };
});
