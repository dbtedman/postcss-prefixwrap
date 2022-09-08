import { asPostCSSv8PluginGenerator } from "../../../src/plugin/PostCSS8Plugin";

describe("asPostCSSv8PluginGenerator", () => {
  it("can be generated", () => {
    expect(asPostCSSv8PluginGenerator()(".my-custom-wrap", {})).not.toBeNull();
  });
});
