import postcss from "postcss";
import postcss7 from "postcss7";
import { execSync } from "child_process";
import fs from "fs";
import * as path from "path";

// The purpose of this collection of tests is to verify that our published plugin can
// be loaded successfully into postcss and process some trivial css. These tests intend
// to catch issues with the build process or the external interface we expose to plugin
// consumers.
describe("PostCSS", () => {
  const source = "p { color: red; }";
  const prefixed = ".my-custom-wrap p { color: red; }";

  beforeAll(() => {
    // Publish the plugin locally (without uploading to registry), then extract the files
    // so that we can load them into our tests.
    execSync(
      "pnpm run build && pnpm run pack --filename=pack.tgz && tar -xvzf pack.tgz && rm pack.tgz",
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

    const result = await postcss([plugin]).process(source, {
      from: "example.css",
    });
    expect(result.css).toEqual(prefixed);
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

    const result = await postcss7([plugin]).process(source, {
      from: "example.css",
    });
    expect(result.css).toEqual(prefixed);
  });

  afterAll(() => {
    // Cleanup locally published files.
    execSync("rm -rf ./package", {
      stdio: "pipe",
    });
  });
});
