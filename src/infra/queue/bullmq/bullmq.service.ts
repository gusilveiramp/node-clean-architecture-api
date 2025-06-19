import { Queue } from "bullmq";
import { redisConnection } from "../../config/redis.config";
import { QueueInterface } from "../queue.interface";

export class BullmqQueueService implements QueueInterface {
  private emailQueue = new Queue("email", { connection: redisConnection });

  async addEmailJob(data: { to: string; subject: string; body: string }): Promise<void> {
    await this.emailQueue.add("send", data);
  }

  // Aqui no futuro você pode adicionar mais filas
  // async addPdfJob() { ... }

  async close(): Promise<void> {
    await Promise.all([
      this.emailQueue.close(),
      // this.pdfQueue.close()
      // etc...
    ]);
  }
}
