// jest.e2e.config.ts
import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  rootDir: "../../../",
  testMatch: ["**/*.e2e.(spec|test).ts"],
  setupFilesAfterEnv: ["<rootDir>/src/infra/testing/setup.e2e.ts"],
};

export default config;
