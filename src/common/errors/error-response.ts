import { Response } from "../../infra/http/http.module";
import { useRequestLanguage } from "../context/request-context";
import { PrismaErrorAdapter } from "./adapters/prisma-error-adapter";
import { CustomError } from "./custom-error";
import { ErrorAdapterInterface } from "./error-adapter.interface";

import { getMessages } from "../i18n";

const errorAdapters: ErrorAdapterInterface[] = [
  new PrismaErrorAdapter(),
  // new ZodErrorAdapter(),
];

export function errorResponse(res: Response, err: unknown): Response {
  console.error("🔥 Error caught globally:", err);

  const lang = useRequestLanguage(); // pego o language da request accept
  const messages = getMessages(lang);

  for (const adapter of errorAdapters) {
    // chama o método canHandle de cada adapter e verifica se o err pode ser tratado por ele.
    if (adapter.canHandle(err)) {
      const handled = adapter.handle(err, messages);
      return res.status(handled.status).json(handled);
    }
  }

  if (err instanceof CustomError) {
    return res.status(err.status).json({
      status: err.status,
      errors: [{ message: err.message }],
    });
  }

  return res.status(500).json({
    errors: [{ message: messages.errors.generic.internal }],
  });
}
