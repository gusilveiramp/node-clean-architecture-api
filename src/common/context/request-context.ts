import { AsyncLocalStorage } from "node:async_hooks";

export type RequestContextData = {
  language: string;
};

const storage = new AsyncLocalStorage<RequestContextData>();

export const RequestContext = {
  run<T>(data: RequestContextData, callback: () => T) {
    return storage.run(data, callback);
  },

  get(): RequestContextData | undefined {
    return storage.getStore();
  },
};

// hook para acessar o accept-language definido no requestContextMiddleware
export function useRequestLanguage(): string {
  return RequestContext.get()?.language ?? "pt-BR";
}
