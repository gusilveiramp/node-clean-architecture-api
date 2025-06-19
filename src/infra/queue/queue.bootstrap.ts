import { QueueModule } from "./queue.module";

async function bootstrap() {
  await QueueModule.init();

  process.on("SIGINT", async () => {
    await QueueModule.shutdown();
    process.exit(0);
  });
}

bootstrap();
