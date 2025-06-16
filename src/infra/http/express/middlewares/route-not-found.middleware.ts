import { Request, Response, NextFunction } from "express";
import { CustomError } from "../../../../common/errors/custom-error";
import { errorResponse } from "../../../../common/errors/error-response";
import { getMessages } from "../../../../common/i18n";
import { useRequestLanguage } from "../../../../common/context/request-context";

export function RouteNotFoundMiddleware(
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  const lang = useRequestLanguage();
  const messages = getMessages(lang);
  const error = new CustomError(messages.errors.generic.routeNotFound, 404);
  errorResponse(res, error);
}
