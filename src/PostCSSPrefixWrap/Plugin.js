const PostCSS = require("postcss");

const Selector = require("./Selector");

class Plugin {
  /**
   * @param {String} prefixSelector
   * @param {Object} options
   */
  constructor(prefixSelector, options) {
    this.isPrefixSelector = new RegExp(`^s*${prefixSelector}.*$`);
    this.prefixRootTags =
      options !== undefined && options.hasOwnProperty("prefixRootTags")
        ? options.prefixRootTags
        : false;
    this.prefixSelector = prefixSelector;
  }

  static asPostCSSPlugin() {
    return PostCSS.plugin(
      "postcss-prefixwrap",
      (prefixSelector, options) => {
        return new Plugin(prefixSelector, options).process();
      }
    );
  }

  /**
   * @param {String} cssSelector
   * @param {postcss.Rule} cssRule
   * @returns {null|String}
   */
  prefixWrapCSSSelector(cssSelector, cssRule) {
    const cleanSelector = Selector.clean(cssSelector);

    if (cleanSelector === "") {
      return null;
    }

    // Do not prefix keyframes rules.
    if (Selector.isKeyframes(cssRule)) {
      return cleanSelector;
    }

    // Anything other than a root tag is always prefixed.
    if (Selector.isRootTag(cleanSelector)) {
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
   * @param {postcss.Rule} cssRule
   */
  prefixWrapCSSRule(cssRule) {
    // We have found our prefix selector, we just want to leave it as it is already.
    if (!cssRule.selector.match(this.isPrefixSelector)) {
      cssRule.selector = cssRule.selector
        .split(",")
        .map(cssSelector => {
          return this.prefixWrapCSSSelector(cssSelector, cssRule);
        })
        .filter(Selector.isInvalid)
        .join(", ");
    }
  }

  process() {
    return css => {
      css.walkRules(cssRule => {
        this.prefixWrapCSSRule(cssRule);
      });
    };
  }
}

module.exports = Plugin;
