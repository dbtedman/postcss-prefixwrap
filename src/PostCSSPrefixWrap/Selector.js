const ANY_WHITESPACE_AT_BEGINNING_OR_END = /(^\s*|\s*$)/g;
const IS_ROOT_TAG = /^(body|html).*$/;

class Selector {
  /**
   * @param {String} cssSelector
   * @returns {Boolean}
   */
  static isInvalid(cssSelector) {
    return cssSelector !== null;
  }

  /**
   * @param {String} cssSelector
   * @returns {String}
   */
  static clean(cssSelector) {
    return cssSelector.replace(ANY_WHITESPACE_AT_BEGINNING_OR_END, "");
  }

  /**
   * @param {Rule} cssRule
   * @returns {Boolean}
   */
  static isKeyframes(cssRule) {
    return (
      cssRule.parent.type === "atrule" &&
      [
        "keyframes",
        "-webkit-keyframes",
        "-moz-keyframes",
        "-o-keyframes"
      ].indexOf(cssRule.parent.name) !== -1
    );
  }

  /**
   * @param {String} cleanSelector
   * @returns {boolean}
   */
  static isRootTag(cleanSelector) {
    return !cleanSelector.match(IS_ROOT_TAG);
  }
}

module.exports = Selector;
