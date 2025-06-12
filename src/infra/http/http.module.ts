// import { ExpressService } from "./express/express.service";
// export const HttpService = ExpressService;

// // Reexportação dos tipos HTTP — isso DEVE ser mantido ao trocar o framework
// export type { Request, Response } from "./express/express.service";

// http.module.ts
import { env } from "../config/env";
import type { Server } from "node:http";
import {
  ExpressService,
  Request as ExpressRequest,
  Response as ExpressResponse,
  NextFunction as ExpressNextFunction,
} from "./express/express.service";

export class HttpModule {
  static http = new ExpressService();
  private static server: Server | null = null;

  static async init() {
    // Aqui poderia ter setup de APM, Sentry, middlewares externos, etc.
    HttpModule.server = HttpModule.http.listen(env.NODE_PORT);
    // console.log("📟 Http module initialized");
  }

  static async shutdown() {
    if (HttpModule.server) {
      HttpModule.server.close(() => {
        console.log("HTTP server shut down gracefully");
      });
    }
  }
}

// Essa parte é essencial pro uso correto de tipos
export type Request = ExpressRequest;
export type Response = ExpressResponse;
// export type NextFunction = ExpressNextFunction;
