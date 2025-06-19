import { redisClient } from "../../../config/redis.config";
import { BullmqQueueService } from "../bullmq.service";

describe("BullmqQueueService", () => {
  let service: BullmqQueueService;

  beforeAll(() => {
    service = new BullmqQueueService();
  });

  afterAll(async () => {
    await service.close();
    await redisClient.quit();
  });

  it("should add an email job without throwing", async () => {
    await expect(
      service.addEmailJob({
        to: "test@example.com",
        subject: "Test Subject",
        body: "Test Body",
      }),
    ).resolves.toBeUndefined();
  });
});
