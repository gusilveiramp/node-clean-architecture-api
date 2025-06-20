import "dotenv/config";

import { randomUUID } from "crypto";
import { DatabaseModule } from "../database/database.module";

const schemaId = `test_${randomUUID()}`;
const testDbUrl = generateTestDatabaseUrl(process.env.DATABASE_URL!, schemaId);
process.env.DATABASE_URL = testDbUrl;

function generateTestDatabaseUrl(baseUrl: string, schemaId: string): string {
  if (!baseUrl) throw new Error("DATABASE_URL is not defined!");
  const url = new URL(baseUrl);
  url.searchParams.set("schema", schemaId);
  return url.toString();
}

beforeAll(async () => {
  jest.spyOn(console, "log").mockImplementation(() => {});
  jest.spyOn(console, "error").mockImplementation(() => {});
  jest.spyOn(console, "warn").mockImplementation(() => {});

  console.log(`🧪 Using schema: ${schemaId}`);
  await DatabaseModule.dropSchema(schemaId);
  await DatabaseModule.migrate();
  await DatabaseModule.init();
});

afterAll(async () => {
  await DatabaseModule.dropSchema(schemaId);
  await DatabaseModule.shutdown();
});
