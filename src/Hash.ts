export default class Hash {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static value(hash: any, key: string, defaultValue: any = null): any {
    if (Object.prototype.hasOwnProperty.call(hash, key)) {
      return hash[key];
    }

    return defaultValue;
  }
}
