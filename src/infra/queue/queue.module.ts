import { BullmqQueueService } from "./bullmq/bullmq.service";
import { QueueInterface } from "./queue.interface";

export class QueueModule {
  static queueService: QueueInterface = new BullmqQueueService();

  static async init() {
    console.log("🚀 QueueModule initialized and workers registered.");
    // Future: Initialize other dependencies if needed
  }

  static async shutdown() {
    console.log("🛑 QueueModule shutting down...");
    if (this.queueService.close) {
      await this.queueService.close();
    }
  }
}
