import postcss from "postcss";
import postcssPrefixWrap from "postcss-prefixwrap";

postcss([postcssPrefixWrap(".selector")]);
