import { HttpRouter } from "../http.interface";
import { HttpHandler } from "../http.module";

export function registerHealthcheckRoutes(router: HttpRouter<HttpHandler>) {
  router.get("/healthcheck", async (_req, res) => {
    res.json({ status: "ok" });
  });
}
