import { emailWorker } from "./bullmq/workers/email.worker";
import { QueueModule } from "./queue.module";

async function bootstrap() {
  await QueueModule.init();

  console.log("👷 Workers initialized.");

  process.on("SIGINT", async () => {
    await QueueModule.shutdown();
    await emailWorker.close();
    process.exit(0);
  });
}

bootstrap();
