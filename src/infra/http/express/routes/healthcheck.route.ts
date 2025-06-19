import { Router } from "express";

const healthcheckRouter = Router();

healthcheckRouter.get("/healthcheck", async (_req, res) => {
  res.send({ status: "ok" });
});

export { healthcheckRouter };
