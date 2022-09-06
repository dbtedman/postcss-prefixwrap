module.exports = {
  roots: ["<rootDir>/test"],
  modulePaths: ["<rootDir>/src", "<rootDir>/node_modules"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  collectCoverage: true,
  coverageReporters: ["text", "cobertura"],
  collectCoverageFrom: ["<rootDir>/src/**"],
};
