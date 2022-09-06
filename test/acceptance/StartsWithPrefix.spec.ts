import * as path from "path";
import PrefixAssert from "./support/PrefixAssert";
import { postCSSWithPlugin } from "./support/PluginBootstrap";

describe("Acceptance: Starts with prefix", () => {
  const postCSSSkip = postCSSWithPlugin({}, ".te");

  it("does not get confused", () => {
    PrefixAssert.actualMatchesExpectedAfterPrefixWrap(
      postCSSSkip,
      path.join(__dirname, "fixtures", "starts-with-prefix-raw.css"),
      path.join(__dirname, "fixtures", "starts-with-prefix-expected.css")
    );
  });
});
