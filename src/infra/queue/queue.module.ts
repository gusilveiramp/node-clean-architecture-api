import { BullmqQueueService } from "./bullmq/bullmq.service";
import { QueueInterface } from "./queue.interface";

export class QueueModule {
  static queueService: QueueInterface = new BullmqQueueService();

  static async init() {
    console.log("🚀 QueueModule initialized and workers registered.");
    // Aqui no futuro: inicialização de outras dependências de fila, se precisar
  }

  static async shutdown() {
    console.log("🛑 QueueModule shutting down...");
    // Se no futuro você quiser fechar conexões, parar workers, etc, pode fazer aqui
  }
}
