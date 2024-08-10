import { Postcss } from "postcss";

import { PostCSS7Plugin, PostcssV7, PostCSS8Plugin } from "../Types";

import { asPostCSSv8PluginGenerator, isPostCSSv8 } from "./PostCSS8Plugin";
import { asPostCSSv7PluginGenerator } from "./PostCSS7Plugin";

export = (postcss: PostcssV7 | Postcss): PostCSS7Plugin | PostCSS8Plugin => {
    if (isPostCSSv8(postcss)) {
        return asPostCSSv8PluginGenerator();
    } else {
        return asPostCSSv7PluginGenerator(postcss as PostcssV7);
    }
};
