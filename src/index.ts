import PluginConstructor from "./PluginConstructor";

const pluginConstructor = new PluginConstructor();

// Expose our class as a PostCSS Plugin.
const ourPlugin = pluginConstructor.asPostCSSPlugin();
export = ourPlugin;
