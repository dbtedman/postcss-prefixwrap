import fs from "fs";
import path from "path";

export const fileFromBaseAsString = (relativePath: string): string => {
  return fs
    .readFileSync(path.join(`${__dirname}/../../`, relativePath), "utf8")
    .toString();
};
