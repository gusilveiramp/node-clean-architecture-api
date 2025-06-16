import { Messages } from "../i18n/types";

export interface ErrorAdapterInterface {
  canHandle(error: unknown): boolean;
  handle(
    error: unknown,
    messages: Messages,
  ): {
    status: number;
    message?: string;
    errors: { message: string; [key: string]: any }[];
  };
}
