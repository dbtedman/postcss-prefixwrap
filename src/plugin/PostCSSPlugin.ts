import {
    PostCSS7Plugin,
    PostCSS7PostCSS,
    PostCSS8Plugin,
    PostCSS8PostCSS,
} from "../Types";

import { asPostCSSv8PluginGenerator, isPostCSSv8 } from "./PostCSS8Plugin";
import { asPostCSSv7PluginGenerator } from "./PostCSS7Plugin";

export = (
    postcss: PostCSS7PostCSS | PostCSS8PostCSS,
): PostCSS7Plugin | PostCSS8Plugin => {
    if (isPostCSSv8(postcss)) {
        return asPostCSSv8PluginGenerator();
    } else {
        return asPostCSSv7PluginGenerator(postcss as PostCSS7PostCSS);
    }
};
