import { Request, Response, NextFunction } from "express";
import { CustomError } from "../../../../common/errors/custom-error";
import { errorResponse } from "../../../../common/errors/error-response";

export function RouteNotFoundMiddleware(
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  const error = new CustomError("Rota não encontrada", 404);
  errorResponse(res, error);
}
