import { PrismaClient } from "@prisma/client";
import { DatabaseServiceInterface } from "../database.interface";
import { execSync } from "node:child_process";
import { env } from "../../config/env";

export class PrismaService
  extends PrismaClient
  implements DatabaseServiceInterface
{
  constructor() {
    super({ log: ["warn", "error"] });
  }

  async connect() {
    await this.$connect();
  }

  async disconnect() {
    await this.$disconnect();
  }

  async dropSchema(schema: string) {
    // use com cuidado: isso apaga tudo!
    await this.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`);
  }

  async migrate() {
    execSync(`DATABASE_URL="${env.DATABASE_URL}" npx prisma migrate deploy`, {
      stdio: "inherit",
    });
  }
}
