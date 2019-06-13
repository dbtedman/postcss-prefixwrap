export default class Hash {
  static value(hash: object, key: string, defaultValue: any = null) {
    if (Object.prototype.hasOwnProperty.call(hash, key)) {
      // @ts-ignore
      return hash[key];
    }

    return defaultValue;
  }
}
