import postcss from "postcss";
import fs from "fs";
import * as path from "path";
import { fileFromBaseAsString } from "../Integration";

describe("PostCSS", () => {
  it("defines main file that exists", () => {
    const packageJSON = JSON.parse(fileFromBaseAsString("package.json"));

    expect(packageJSON.main).toBeDefined();

    const packagePath = path.join(
      __dirname,
      "../../../package/",
      packageJSON.main
    );

    expect(fs.existsSync(packagePath)).toBeTruthy();
  });

  it("can load main file as postCSS plugin that works", async () => {
    const packageJSON = JSON.parse(fileFromBaseAsString("./package.json"));
    const packagePath = path.join(
      __dirname,
      "../../../package/",
      packageJSON.main
    );
    // eslint-disable-next-line @typescript-eslint/no-var-requires,security-node/detect-non-literal-require-calls
    const postCSSPrefixWrap = require(packagePath);
    const plugin = postCSSPrefixWrap(".my-custom-wrap");

    const result = await postcss([plugin]).process("", { from: "example.css" });
    expect(result).not.toBeNull();
  });
});
