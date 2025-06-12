export interface DatabaseServiceInterface {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  dropSchema?(schema: string): Promise<void>; // opcional for E2E
  migrate?(): Promise<void>; // optional for E2E
}
