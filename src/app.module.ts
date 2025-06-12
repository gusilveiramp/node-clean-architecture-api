import { DatabaseModule } from "./infra/database/database.module";
import { HttpModule } from "./infra/http/http.module";

async function bootstrap() {
  await DatabaseModule.init();
  await HttpModule.init();

  process.on("SIGINT", async () => {
    await DatabaseModule.shutdown();
    await HttpModule.shutdown();
    process.exit(0);
  });
}

bootstrap();
