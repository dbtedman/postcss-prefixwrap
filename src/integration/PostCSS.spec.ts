import postcss from "postcss";
import { execSync } from "child_process";
import fs from "fs";
import * as path from "path";

describe("PostCSS", () => {
  beforeAll(() => {
    execSync(
      "yarn build && yarn pack --filename=pack.tgz && tar -xvzf pack.tgz && rm pack.tgz",
      {
        stdio: "pipe",
      }
    );
  });

  it("defines main file that exists", () => {
    const content = fs.readFileSync(`${__dirname}/../../package.json`, "UTF-8");
    const packageJSON = JSON.parse(content.toString());

    expect(packageJSON.main).toBeDefined();

    const packagePath = path.join(
      __dirname,
      "../../package/",
      packageJSON.main
    );

    expect(fs.existsSync(packagePath)).toBeTruthy();
  });

  it("can load main file as postCSS plugin that works", async () => {
    const content = fs.readFileSync(`${__dirname}/../../package.json`, "UTF-8");
    const packageJSON = JSON.parse(content.toString());
    const packagePath = path.join(
      __dirname,
      "../../package/",
      packageJSON.main
    );
    const postCSSPrefixWrap = require(packagePath);
    const plugin = postCSSPrefixWrap(".my-custom-wrap");

    const result = await postcss([plugin]).process("", { from: "example.css" });
    expect(result).not.toBeNull();
  });

  afterAll(() => {
    execSync("rm -rf ./package", {
      stdio: "pipe",
    });
  });
});
