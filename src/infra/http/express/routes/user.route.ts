import { Router } from "express";

import { DatabaseModule } from "../../../database/database.module";
import { UserController } from "../../../../modules/users/user.controller";

const userRouter = Router();

const userController = new UserController(DatabaseModule.userRepository);

userRouter.get("/users", (req, res) => userController.findAll(req, res));
userRouter.get("/users/:user_id", (req, res) => userController.update(req, res));
userRouter.post("/users", (req, res) => userController.create(req, res));
userRouter.put("/users/:user_id", (req, res) => userController.update(req, res));

export { userRouter };
