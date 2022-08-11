/* eslint-disable @typescript-eslint/no-var-requires */

const path = require("path");
const fs = require("fs");
const glob = require("glob");

const acceptanceTestPath = path.join(__dirname, "build", "acceptance");
const integrationTestPath = path.join(__dirname, "build", "integration");
const buildPath = path.join(__dirname, "build");
const testFiles = glob.sync(`${buildPath}/*.spec.{js,d.ts}`);

if (fs.existsSync(acceptanceTestPath)) {
  fs.rmSync(acceptanceTestPath, { recursive: true });
}

if (fs.existsSync(integrationTestPath)) {
  fs.rmSync(integrationTestPath, { recursive: true });
}

testFiles.forEach((filePath) => fs.rmSync(filePath));
