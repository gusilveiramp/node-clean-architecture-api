import { ErrorAdapterInterface } from "../error-adapter.interface";
import { Messages } from "../../i18n/types";
import { CustomErrorResponse } from "../types";

function isBodyParserSyntaxError(
  error: unknown,
): error is SyntaxError & { status: number; body: string; type: string } {
  if (!(error instanceof SyntaxError)) return false;

  const maybeError = error as unknown as Record<string, unknown>;

  return (
    typeof maybeError.status === "number" &&
    typeof maybeError.body === "string" &&
    typeof maybeError.type === "string"
  );
}

export class BodyParserErrorAdapter implements ErrorAdapterInterface {
  canHandle(error: unknown): boolean {
    return isBodyParserSyntaxError(error) && error.status === 400;
  }

  handle(_error: unknown, messages: Messages): CustomErrorResponse {
    return {
      status: 400,
      message: messages.errors.generic.invalidBody,
      errors: [
        {
          message: messages.errors.generic.invalidBody,
        },
      ],
    };
  }
}
