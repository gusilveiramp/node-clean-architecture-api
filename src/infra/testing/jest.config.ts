/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src"], // diz onde está o "raiz do projeto"
  rootDir: "../../../", // define que os testes e arquivos vêm do src
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.ts?$",
  moduleFileExtensions: ["ts", "js", "json"],
  testPathIgnorePatterns: [".e2e.spec.ts", ".e2e.test.ts"], // Ignore E2E tests by default for unita and integration tests
  coverageProvider: "v8",
  coverageDirectory: "<rootDir>/coverage",
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/**/__tests__/**",
    "!src/**/*.spec.ts",
    "!src/**/*.test.ts",
    "!src/infra/testing/**",
    "!src/infra/config/env.ts", // se quiser ignorar env
  ],
};

export default config;
