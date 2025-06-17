import { ZodSchema } from "zod";
import { Request } from "../../infra/http/http.module";

export function validateRequest<TBody = unknown, TParams = unknown>(
  bodySchema: ZodSchema<TBody> | null,
  paramsSchema: ZodSchema<TParams> | null,
  req: Request,
): { body: TBody; params: TParams } {
  const parsedBody = bodySchema ? bodySchema.parse(req.body) : ({} as TBody);
  const parsedParams = paramsSchema ? paramsSchema.parse(req.params) : ({} as TParams);

  return { body: parsedBody, params: parsedParams };
}
