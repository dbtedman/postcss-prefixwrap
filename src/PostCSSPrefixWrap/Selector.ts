import { Rule } from "postcss";

const ANY_WHITESPACE_AT_BEGINNING_OR_END = /(^\s*|\s*$)/g;
const IS_ROOT_TAG = /^(body|html).*$/;

export default class Selector {
  static isValid(cssSelector: string | null): boolean {
    return cssSelector !== null;
  }

  static clean(cssSelector: string): string {
    return cssSelector.replace(ANY_WHITESPACE_AT_BEGINNING_OR_END, "");
  }

  static isKeyframes(cssRule: Rule): boolean {
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

  static isNotRootTag(cleanSelector: string): boolean {
    return !cleanSelector.match(IS_ROOT_TAG);
  }
}
