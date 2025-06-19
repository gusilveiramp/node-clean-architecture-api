import { env } from "../config/env.config";
import type { Server } from "node:http";
import {
  ExpressService,
  Request as ExpressRequest,
  Response as ExpressResponse,
} from "./express/express.service";
import { ExpressHandler } from "./express/adapters/express-router.adapter";

export class HttpModule {
  static http = new ExpressService();
  private static server: Server | null = null;

  static async init() {
    // Aqui poderíamos adicionar setup de APMs, Sentry, middlewares globais externos etc.
    HttpModule.server = HttpModule.http.listen(env.NODE_PORT);
    console.log("📟 Http module initialized");
  }

  static async shutdown() {
    if (HttpModule.server) {
      HttpModule.server.close(() => {
        console.log("HTTP server shut down gracefully");
      });
    }
  }

  static getAppInstance() {
    return HttpModule.http.getApp();
  }
}

// Exportando os tipos HTTP (Request, Response, HttpHandler) de forma padronizada
export type Request = ExpressRequest;
export type Response = ExpressResponse;
export type HttpHandler = ExpressHandler;
