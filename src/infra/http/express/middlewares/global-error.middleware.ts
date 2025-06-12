import { ErrorRequestHandler } from "express";
import { errorResponse } from "../../../../common/errors/error-response";

export const GlobalErrorMiddleware: ErrorRequestHandler = (
  err,
  _req,
  res,
  _next,
): void => {
  errorResponse(res, err);
};
