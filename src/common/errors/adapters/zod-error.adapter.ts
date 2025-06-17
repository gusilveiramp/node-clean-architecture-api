// src/common/errors/adapters/zod-error-adapter.ts
import { ZodError, ZodIssueCode } from "zod";
import { ErrorAdapterInterface } from "../error-adapter.interface";
import { Messages } from "../../i18n/types";
import { CustomErrorResponse } from "../types";

export class ZodErrorAdapter implements ErrorAdapterInterface {
  canHandle(error: unknown): boolean {
    return error instanceof ZodError;
  }

  handle(error: unknown, messages: Messages): CustomErrorResponse {
    const zodError = error as ZodError;

    const errors = zodError.errors.map((issue) => {
      const field = issue.path[0]?.toString();

      let message = "";

      switch (issue.code) {
        case ZodIssueCode.too_small:
          if (issue.type === "string" && issue.minimum !== undefined) {
            message = this.interpolate(messages.validation.string.minLength, {
              min: issue.minimum.toString(),
            });
          } else if (issue.type === "number" && issue.minimum !== undefined) {
            message = this.interpolate(messages.validation.number.min, {
              min: issue.minimum.toString(),
            });
          }
          break;

        case ZodIssueCode.invalid_type:
          if (issue.expected === "string" || issue.expected === "number") {
            message = this.interpolate(messages.validation[issue.expected].invalid, {
              expected: issue.expected,
              received: issue.received,
            });
          } else {
            message = messages.errors.generic.invalidBody;
          }
          break;

        case ZodIssueCode.invalid_string:
          if (issue.validation === "email") {
            message = messages.validation.email.invalid;
          }
          break;

        case ZodIssueCode.invalid_literal:
          message = messages.errors.generic.invalidBody;
          break;

        case ZodIssueCode.invalid_enum_value:
          message = messages.errors.generic.invalidBody;
          break;

        case ZodIssueCode.custom:
          message = issue.message;
          break;

        case ZodIssueCode.invalid_union:
        case ZodIssueCode.invalid_union_discriminator:
        case ZodIssueCode.invalid_arguments:
        case ZodIssueCode.invalid_return_type:
        case ZodIssueCode.unrecognized_keys:
        case ZodIssueCode.invalid_date:
        case ZodIssueCode.invalid_intersection_types:
        case ZodIssueCode.not_multiple_of:
        case ZodIssueCode.too_big:
        default:
          message = messages.errors.generic.invalidBody;
          break;
      }

      if (!field) {
        return { message };
      }

      return { field, message };
    });

    return {
      status: 400,
      message: messages.errors.generic.validation,
      errors,
    };
  }

  private interpolate(template: string, variables: Record<string, string>): string {
    return template.replace(/{(.*?)}/g, (_, key) => variables[key] ?? `{${key}}`);
  }
}
