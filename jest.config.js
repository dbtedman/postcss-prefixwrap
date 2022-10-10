module.exports = {
  roots: ["<rootDir>/test"],
  modulePaths: ["<rootDir>/src", "<rootDir>/node_modules"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  coverageReporters: ["text", "cobertura"],
  collectCoverageFrom: ["<rootDir>/src/**"],
};
