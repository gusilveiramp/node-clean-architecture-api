import { Worker } from "bullmq";
import { redisConnection } from "../../../config/redis.config";

export const emailWorker = new Worker(
  "email",
  async (job) => {
    console.log(`📧 Enviando email para: ${job.data.to}`);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simula envio
    console.log(`✅ Email enviado com sucesso para ${job.data.to}`);
  },
  { connection: redisConnection },
);

emailWorker.on("completed", (job) => {
  console.log(`✅ Job de email ${job.id} concluído`);
});

emailWorker.on("failed", (job, err) => {
  console.error(`❌ Job de email ${job?.id} falhou:`, err);
});
