import express from "express";

import { DatabaseModule } from "../../database/database.module";
import { UserController } from "../../../modules/users/user.controller";

const router = express.Router();

const controller = new UserController(DatabaseModule.userRepository);

router.get("/users", (req, res) => controller.list(req, res));
router.post("/users", (req, res) => controller.create(req, res));
router.put("/users/:user_id", (req, res) => controller.update(req, res));

export default router;
