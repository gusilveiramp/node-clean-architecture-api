import { Request, Response, NextFunction } from "express";
import { RequestContext } from "../../../../common/context/request-context";

// Middleware que cria o contexto da request via AsyncLocalStorage
// 1. Isso inicia um novo contexto assíncrono para essa requisição.
//    Tudo que rodar dentro do next() (inclusive controllers, use-cases, Prisma, etc.) pode acessar esse mesmo contexto.
// 2. Em qualquer lugar do seu app (controller, adapter, error handler, etc.)
//    Você pode fazer: const lang = useRequestLanguage();
//    Isso internamente usa RequestContext.get() pra recuperar o valor da request atual.
//    Isso funciona mesmo se você estiver mil linhas depois, dentro de um await, ou em outro módulo.

export function requestContextMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  const lang = req.headers["accept-language"]?.toString() || "pt-BR"; // pegamos a accept-language do cabeçalho que vem do front-end
  RequestContext.run({ language: lang }, () => {
    next();
  });
}
