import express from "express";

import { DatabaseModule } from "../../database/database.module";
import { UserController } from "../../../modules/users/user.controller";

const router = express.Router();

const controller = new UserController(DatabaseModule.userRepository);

router.post("/users", (req, res) => controller.create(req, res));
router.get("/users", (req, res) => controller.list(req, res));

export default router;
