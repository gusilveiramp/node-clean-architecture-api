import express, {
  Request as ExpressRequest,
  Response as ExpressResponse,
  NextFunction as ExpressNextFunction,
  Express,
} from "express";

import { requestContextMiddleware } from "./middlewares/request-context.middleware";
import { GlobalErrorMiddleware } from "./middlewares/global-error.middleware";
import { RouteNotFoundMiddleware } from "./middlewares/route-not-found.middleware";
import { HttpServiceInterface } from "../http.interface";
import { ExpressRouterAdapter } from "./adapters/express-router.adapter";
import { registerUserRoutes } from "../routes/users.route";
import { registerHealthcheckRoutes } from "../routes/healthcheck.route";

// Exemplo: Se tiver outros módulos, você importa as outras rotas aqui:
// import { registerProductRoutes } from "./routes/product.routes";

export type Request = ExpressRequest;
export type Response = ExpressResponse;
export type NextFunction = ExpressNextFunction;

export class ExpressService implements HttpServiceInterface {
  private app: Express;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(requestContextMiddleware); // Middleware que cria o contexto da request via AsyncLocalStorage

    const routerAdapter = new ExpressRouterAdapter(); // Adapter da camada HTTP (Express)

    // Registro de rotas de cada módulo da aplicação
    registerUserRoutes(routerAdapter);
    registerHealthcheckRoutes(routerAdapter);
    // registerProductRoutes(routerAdapter);
    // registerOtherModuleRoutes(routerAdapter);

    this.app.use(routerAdapter.getRouterInstance()); // Injeta o router real do Express

    this.app.use(RouteNotFoundMiddleware); // Error middlewares
    this.app.use(GlobalErrorMiddleware); // Captura erros globais fora do escopo do CustomError
  }

  listen(port: number) {
    return this.app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });
  }

  getApp() {
    return this.app;
  }
}
