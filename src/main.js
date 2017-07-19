var postcss = require("postcss");

module.exports = postcss.plugin("postcss-prefixwrap", function (selector, options) {
  "use strict";

  options = options || {};
  return function (css) {
    css.walkRules(function (rule) {

      // HTML and Body elements cannot be contained within our container so lets extract their styles

      // and make them the styles of our container.
      /*      if (rule.selector.match(/^ *(body|html).*$/)) {
       if (!options.skipRootTags) {
       rule.selector = rule.selector.replace(/^ *(body|html)/, selector);
       }
       // Prepend selector unless our first rule is a combination of this selector and another rule.
       } else*/
      if (!rule.selector.match(new RegExp("^ *[^ ]*" + selector + ".*$"))) {
        rule.selector = rule.selector
          .split(",")
          .map(function (sel) {
            // console.log(0, sel);
            if (sel.match(/^[\s\S]*(body|html).*$/)) {
              // console.log(1);
              if (options.prefixRootTags) {
                // console.log(3);
                return selector + " ." + sel;
              } else {
                // console.log(2, sel.replace(/^ *(body|html)/, selector))
                return sel.trim().replace(/^[\s\S]*(body|html)/, selector);
              }
            } else {
              // console.log(4);
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
