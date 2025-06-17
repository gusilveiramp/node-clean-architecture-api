// src/common/errors/error-adapter.interface.ts
import { Messages } from "../i18n/types";
import { CustomErrorResponse } from "./types";

export interface ErrorAdapterInterface {
  canHandle(error: unknown): boolean;
  handle(error: unknown, messages: Messages): CustomErrorResponse;
}
