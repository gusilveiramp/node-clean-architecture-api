import { RedisOptions as IORedisOptions } from "ioredis";
import { env } from "./env.config";
import { Redis } from "ioredis";

// Configuração no formato que o BullMQ espera (porque BullMQ passa isso direto pro ioredis)
export const redisConnection: IORedisOptions = {
  host: env.REDIS_HOST,
  port: Number(env.REDIS_PORT),
  password: env.REDIS_PASSWORD,
  maxRetriesPerRequest: null,
};

export const redisClient = new Redis(redisConnection);
