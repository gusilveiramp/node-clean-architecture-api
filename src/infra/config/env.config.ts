import "dotenv/config";

import { z } from "zod";

// Define o schema com coerce + defaults
const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("production"),
  NODE_PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.string().url(),
  REDIS_HOST: z.string().default("127.0.0.1"),
  REDIS_PORT: z.coerce.number().default(6379),
  REDIS_PASSWORD: z.string(),
});

// Validação
const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error("⚠️ Invalid environment variables:", _env.error.format());
  throw new Error("Invalid environment variables");
}

export const env = _env.data;
