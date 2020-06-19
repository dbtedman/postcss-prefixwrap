import { execSync } from "child_process";
import fs from "fs";

const clean = () => {
  execSync("rm -rf ./src/integration/gulp/fixtures/dist", {
    stdio: "pipe",
  });
};

describe("Gulp", () => {
  beforeEach(() => clean());

  it("can run plugin in postcss pipe", () => {
    execSync("yarn gulp --cwd='./src/integration/gulp/fixtures'", {
      stdio: "pipe",
    });

    const inFile = fs.readFileSync(
      `${__dirname}/fixtures/css/app-expected.css`,
      "utf8"
    );
    const outFile = fs.readFileSync(
      `${__dirname}/fixtures/dist/app.css`,
      "utf8"
    );

    expect(outFile).toEqual(inFile);
  });

  afterEach(() => clean());
});
