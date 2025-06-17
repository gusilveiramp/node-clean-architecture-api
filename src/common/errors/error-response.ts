// src/common/errors/error-response.ts

import { Response } from "../../infra/http/http.module";
import { useRequestLanguage } from "../context/request.context";
import { PrismaErrorAdapter } from "./adapters/prisma-error.adapter";
import { CustomError } from "./custom-error";
import { ErrorAdapterInterface } from "./error-adapter.interface";
import { getMessages } from "../i18n";
import { CustomErrorResponse } from "./types";
import { ZodErrorAdapter } from "./adapters/zod-error.adapter";
import { ZodError } from "zod";
import { BodyParserErrorAdapter } from "./adapters/body-parser-error.adapter";

const errorAdapters: ErrorAdapterInterface[] = [
  new PrismaErrorAdapter(),
  new ZodErrorAdapter(),
  new BodyParserErrorAdapter(),
  // No futuro: new SequelizeErrorAdapter(), etc...
];

export function errorResponse(res: Response, err: unknown): Response {
  // Log diferente para erros de validação
  if (err instanceof ZodError) {
    console.warn("🟡 Zod validation error:", err.flatten());
  } else {
    console.error("🔥 Error caught globally:", err);
  }

  const lang = useRequestLanguage();
  const messages = getMessages(lang);

  for (const adapter of errorAdapters) {
    if (adapter.canHandle(err)) {
      const handled = adapter.handle(err, messages);
      return res.status(handled.status).json(handled);
    }
  }

  if (err instanceof CustomError) {
    const response: CustomErrorResponse = {
      status: err.status,
      message: err.message,
      errors: [{ message: err.message }],
    };
    return res.status(err.status).json(response);
  }

  const fallback: CustomErrorResponse = {
    status: 500,
    message: messages.errors.generic.internal,
    errors: [{ message: messages.errors.generic.internal }],
  };

  return res.status(500).json(fallback);
}
