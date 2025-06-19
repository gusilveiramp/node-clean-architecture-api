import { Request, Response, NextFunction, Router } from "express";
import { HttpRouter } from "../../http.interface";

export type ExpressHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => void | Promise<void>;

export class ExpressRouterAdapter implements HttpRouter<ExpressHandler> {
  private router = Router();

  get(path: string, handler: ExpressHandler) {
    this.router.get(path, handler);
  }

  post(path: string, handler: ExpressHandler) {
    this.router.post(path, handler);
  }

  put(path: string, handler: ExpressHandler) {
    this.router.put(path, handler);
  }

  patch(path: string, handler: ExpressHandler) {
    this.router.patch(path, handler);
  }

  delete(path: string, handler: ExpressHandler) {
    this.router.delete(path, handler);
  }

  getRouterInstance() {
    return this.router;
  }
}
