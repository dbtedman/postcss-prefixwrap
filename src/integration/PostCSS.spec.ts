import postcss from "postcss";
import postcss7 from "postcss7";
import { execSync } from "child_process";
import fs from "fs";
import * as path from "path";

// TODO: Also check the output css too here
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
    const content = fs.readFileSync(`${__dirname}/../../package.json`, "utf8");
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
    const content = fs.readFileSync(`${__dirname}/../../package.json`, "utf8");
    const packageJSON = JSON.parse(content.toString());
    const packagePath = path.join(
      __dirname,
      "../../package/",
      packageJSON.main
    );
    // eslint-disable-next-line @typescript-eslint/no-var-requires,security-node/detect-non-literal-require-calls
    const postCSSPrefixWrap = require(packagePath);

    const plugin = postCSSPrefixWrap(".my-custom-wrap");

    const result = postcss([plugin]).process("", { from: "example.css" });
    expect(result).not.toBeNull();
  });

  it("can load main file as postCSS 7 plugin that works", async () => {
    const content = fs.readFileSync(`${__dirname}/../../package.json`, "utf8");
    const packageJSON = JSON.parse(content.toString());
    const packagePath = path.join(
      __dirname,
      "../../package/",
      packageJSON.main
    );

    // Call wrapper directly as we can modify the postcss version provided to it
    // eslint-disable-next-line @typescript-eslint/no-var-requires,security-node/detect-non-literal-require-calls
    const postCSSPrefixWrap = require(packagePath.replace(
      "index.js",
      "indexWrap.js"
    ))(postcss7);

    const plugin = postCSSPrefixWrap(".my-custom-wrap");

    const result = postcss7([plugin]).process("", { from: "example.css" });
    expect(result).not.toBeNull();
  });

  afterAll(() => {
    execSync("rm -rf ./package", {
      stdio: "pipe",
    });
  });
});
