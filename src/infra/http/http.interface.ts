export interface HttpServiceInterface {
  listen(port: number): void;
}

export interface HttpRouter<HandlerType> {
  get(path: string, handle: HandlerType): void;
  post(path: string, handle: HandlerType): void;
  put(path: string, handle: HandlerType): void;
  patch(path: string, handle: HandlerType): void;
  delete(path: string, handle: HandlerType): void;
}
