import { Messages } from "../i18n/types";

export interface ErrorAdapterInterface {
  canHandle(error: unknown): boolean;
  handle(
    error: unknown,
    messages: Messages,
  ): { status: number; errors: { message: string }[] };
}
