import express, {
  Request as ExpressRequest,
  Response as ExpressResponse,
  NextFunction as ExpressNextFunction,
} from "express";

export type Request = ExpressRequest;
export type Response = ExpressResponse;
export type NextFunction = ExpressNextFunction;

import router from "./routes";
import { requestContextMiddleware } from "./middlewares/request-context.middleware";
import { GlobalErrorMiddleware } from "./middlewares/global-error.middleware";
import { RouteNotFoundMiddleware } from "./middlewares/route-not-found.middleware";
import { HttpServiceInterface } from "../http.interface";

export class ExpressService implements HttpServiceInterface {
  private app = express();

  constructor() {
    this.app.use(express.json());

    // Middleware que cria o contexto da request via AsyncLocalStorage
    this.app.use(requestContextMiddleware);

    // Modules routes
    this.app.use(router);

    // Error middlewares
    this.app.use(RouteNotFoundMiddleware);

    // Captura erros globais fora do escopo do CustomError
    this.app.use(GlobalErrorMiddleware);
  }

  listen(port: number) {
    return this.app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });
  }
}
