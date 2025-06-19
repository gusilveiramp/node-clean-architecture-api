export interface QueueInterface {
  addEmailJob(data: { to: string; subject: string; body: string }): Promise<void>;
  close(): Promise<void>;
  // No futuro: addOcrJob, addPdfJob, etc.
}
