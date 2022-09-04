module.exports = {
  roots: ["<rootDir>/src"],
  modulePaths: ["<rootDir>/src", "<rootDir>/node_modules"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  collectCoverage: true,
  coverageReporters: ["text", "cobertura"],
};
