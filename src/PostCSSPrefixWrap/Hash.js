class Hash {
  /**
   * @param {Object} hash
   * @param {String} key
   * @param {*} defaultValue
   * @returns {*}
   */
  static value(hash, key, defaultValue = null) {
    if (Object.prototype.hasOwnProperty.call(hash, key)) {
      return hash[key];
    }

    return defaultValue;
  }
}

module.exports = Hash;
