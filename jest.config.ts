import type { Config } from 'jest';

const config: Config = {
  preset: "ts-jest",

  // An array of file extensions your modules use
  moduleFileExtensions: [
    "ts",
    "js",
    "json"
  ],

  testPathIgnorePatterns: [
    "/node_modules"
  ]
};

export default config;