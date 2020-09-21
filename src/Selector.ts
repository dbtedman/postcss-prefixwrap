import { Rule } from "postcss";
import AtRule from "postcss/lib/at-rule";

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
    const { parent } = cssRule;
    const parentReal = parent as AtRule;

    // @see https://developer.mozilla.org/en-US/docs/Web/CSS/At-rule
    return (
      parent !== undefined &&
      parentReal.type === "atrule" &&
      parentReal.name !== undefined &&
      parentReal.name.match(/keyframes$/) !== null
    );
  }

  static isNotRootTag(cleanSelector: string): boolean {
    return !cleanSelector.match(IS_ROOT_TAG);
  }
}
