module.exports = {
  preset: "ts-jest/presets/js-with-ts",
  testEnvironment: "jsdom",
  // TODO: convert tests to typescript
  testMatch: ["**/*.test.*"],
  testPathIgnorePatterns: ["./node_modules/"],
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleNameMapper: {
    "@common/(.*)$": "<rootDir>/src/common/$1",
    "@components/(.*)$": "<rootDir>/src/components/$1",
    "@models/(.*)$": "<rootDir>/src/models/$1",
    "@services/(.*)$": "<rootDir>/src/services/$1",
  },
  globals: {
    "ts-jest": {
      isolatedModules: true,
      // turn off for now
      diagnostics: false,
    },
  },
};
