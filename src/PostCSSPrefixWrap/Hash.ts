export default class Hash {
  static value(hash: any, key: string, defaultValue: any = null): any {
    if (Object.prototype.hasOwnProperty.call(hash, key)) {
      return hash[key];
    }

    return defaultValue;
  }
}
