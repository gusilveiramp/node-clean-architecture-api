import { env } from "../config/env.config";
import type { Server } from "node:http";
import {
  ExpressService,
  Request as ExpressRequest,
  Response as ExpressResponse,
} from "./express/express.service";

export class HttpModule {
  static http = new ExpressService();
  private static server: Server | null = null;

  static async init() {
    // Aqui poderia ter setup de APM, Sentry, middlewares externos, etc.
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

// Essa parte é essencial pro uso correto de tipos
export type Request = ExpressRequest;
export type Response = ExpressResponse;
