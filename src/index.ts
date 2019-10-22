import OurPlugin from "./OurPlugin";

// Expose our class as a PostCSS Plugin.
const ourPlugin = OurPlugin.asPostCSSPlugin();
export = ourPlugin;
