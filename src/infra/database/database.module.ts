import { UserRepository } from "../../modules/users/repositories/user.repository";
import { env } from "../config/env.config";
import { PrismaService } from "./prisma/prisma.service";
import { PrismaUserRepository } from "./prisma/repositories/user.repository";

export class DatabaseModule {
  static service = new PrismaService();
  static userRepository: UserRepository = new PrismaUserRepository(DatabaseModule.service);

  static async init() {
    await DatabaseModule.service.connect();
    console.log("🔋 Database module initialized");
  }

  static async shutdown() {
    await DatabaseModule.service.disconnect();
  }

  static async dropSchema(schema: string) {
    if (env.NODE_ENV !== "test") {
      throw new Error("❌ dropSchema is only allowed in test environment");
    }
    await DatabaseModule.service.dropSchema(schema);
  }

  static async migrate() {
    if (env.NODE_ENV !== "test") {
      throw new Error("Migrate is only allowed in test environment");
    }
    await DatabaseModule.service.migrate();
  }
}
