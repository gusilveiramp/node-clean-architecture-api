import express from "express";

import { DatabaseModule } from "../../database/database.module";
import { UserController } from "../../../modules/users/user.controller";

const router = express.Router();

const userController = new UserController(DatabaseModule.userRepository);

router.get("/users", (req, res) => userController.findAll(req, res));
router.post("/users", (req, res) => userController.create(req, res));
router.put("/users/:user_id", (req, res) => userController.update(req, res));

export default router;
