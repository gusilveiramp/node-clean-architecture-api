import { Router } from "express";

import { healthcheckRouter } from "./healthcheck.route";
import { userRouter } from "./user.route";

const router = Router();

router.use(healthcheckRouter);
router.use(userRouter);

export { router };
