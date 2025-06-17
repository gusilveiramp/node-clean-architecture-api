import { ZodError } from "zod";
import { ErrorAdapterInterface } from "../error-adapter.interface";
import { Messages } from "../../i18n/types";
import { CustomErrorResponse } from "../types";

export class ZodErrorAdapter implements ErrorAdapterInterface {
  canHandle(error: unknown): boolean {
    return error instanceof ZodError;
  }

  handle(error: unknown, messages: Messages): CustomErrorResponse {
    const zodError = error as ZodError;

    const errors = zodError.errors.map((e) => {
      const field = e.path[0]?.toString();

      if (!field) {
        return {
          message: messages.errors.generic.invalidBody,
        };
      }

      return {
        field,
        message: e.message,
      };
    });

    return {
      status: 400,
      message: messages.errors.generic.validation,
      errors,
    };
  }
}
