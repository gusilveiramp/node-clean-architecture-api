import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";
import { Messages } from "../../i18n/types";
import { ErrorAdapterInterface } from "../error-adapter.interface";

export class PrismaErrorAdapter implements ErrorAdapterInterface {
  canHandle(error: unknown): boolean {
    return (
      error instanceof PrismaClientKnownRequestError ||
      error instanceof PrismaClientValidationError
    );
  }

  handle(error: unknown, messages: Messages) {
    if (error instanceof PrismaClientValidationError) {
      return {
        status: 400,
        message: messages.errors.generic.validation,
        errors: [{ message: messages.errors.generic.validation }],
      };
    }

    if (error instanceof PrismaClientKnownRequestError) {
      switch (error.code) {
        case "P2002": {
          const target = (error.meta?.target as string[])?.[0] ?? "undefined";
          const field = messages.fields[target] ?? target;
          return {
            status: 400,
            message: messages.errors.database.unique(field),
            errors: [{ field, message: messages.errors.database.unique(field) }],
          };
        }
        case "P2025": {
          return {
            status: 404,
            message: messages.errors.database.notFound,
            errors: [{ message: messages.errors.database.notFound }],
          };
        }
        default:
          return {
            status: 400,
            message: messages.errors.database.genericDb,
            errors: [{ message: messages.errors.database.genericDb }],
          };
      }
    }

    return {
      status: 500,
      message: messages.errors.generic.internal,
      errors: [{ message: messages.errors.generic.internal }],
    };
  }
}
