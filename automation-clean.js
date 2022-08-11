/* eslint-disable @typescript-eslint/no-var-requires */

const path = require("path");
const fs = require("fs");

const buildPath = path.join(__dirname, "build");

if (fs.existsSync(buildPath)) {
  fs.rmSync(buildPath, { recursive: true });
}
