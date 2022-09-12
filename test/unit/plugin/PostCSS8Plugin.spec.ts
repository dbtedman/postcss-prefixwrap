import { asPostCSSv8PluginGenerator } from "../../../src/plugin/PostCSS8Plugin";
import { PostCSSContainer, PostCSSRule } from "../../../src/Types";

describe("asPostCSSv8PluginGenerator", () => {
  it("can be generated", () => {
    const plugin = asPostCSSv8PluginGenerator()(".my-custom-wrap", {});
    const walkRules = jest.fn((callback) => {
      const atRule: PostCSSRule = {
        selector: ".something",
        walkRules: jest.fn(),
      };
      callback(atRule);
    });

    plugin.Once({ walkRules } as PostCSSContainer);

    expect(walkRules).toHaveBeenCalledTimes(1);
  });
});
