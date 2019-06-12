const PostCSS = require("postcss");

const Selector = require("./Selector");
const Hash = require("./Hash");

class Plugin {
  /**
   * @param {String} prefixSelector
   * @param {Object} options
   */
  constructor(prefixSelector, options = {}) {
    this.ignoredSelectors = Hash.value(options, "ignoredSelectors", []);
    this.prefixRootTags = Hash.value(options, "prefixRootTags", false);
    this.isPrefixSelector = new RegExp(`^s*${prefixSelector}.*$`);
    this.prefixSelector = prefixSelector;
  }

  /**
   * @returns {postcss.Plugin<any>}
   */
  static asPostCSSPlugin() {
    return PostCSS.plugin("postcss-prefixwrap", (prefixSelector, options) => {
      return new Plugin(prefixSelector, options).process();
    });
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

    // Check for matching ignored selectors
    if (
      this.ignoredSelectors.some(currentValue =>
        cleanSelector.match(currentValue)
      )
    ) {
      return cleanSelector;
    }

    // Anything other than a root tag is always prefixed.
    if (Selector.isNotRootTag(cleanSelector)) {
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
   * @returns {boolean}
   */
  cssRuleMatchesPrefixSelector(cssRule) {
    return cssRule.selector.match(this.isPrefixSelector) !== null;
  }

  /**
   * @param {postcss.Rule} cssRule
   */
  prefixWrapCSSRule(cssRule) {
    if (this.cssRuleMatchesPrefixSelector(cssRule)) {
      return;
    }

    cssRule.selector = cssRule.selector
      .split(",")
      .map(cssSelector => this.prefixWrapCSSSelector(cssSelector, cssRule))
      .filter(Selector.isValid)
      .join(", ");
  }

  /**
   * @returns {Function}
   */
  process() {
    return css => {
      css.walkRules(cssRule => {
        this.prefixWrapCSSRule(cssRule);
      });
    };
  }
}

module.exports = Plugin;
