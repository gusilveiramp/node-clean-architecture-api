import { HttpRouter } from "../http.interface";
import { UserModule } from "../../../modules/users/user.module";
import { HttpHandler } from "../http.module";

export function registerUserRoutes(router: HttpRouter<HttpHandler>) {
  const userController = UserModule.getUserController();

  router.get("/users", (req, res) => userController.findAll(req, res));
  router.get("/users/:user_id", (req, res) => userController.update(req, res));
  router.post("/users", (req, res) => userController.create(req, res));
  router.put("/users/:user_id", (req, res) => userController.update(req, res));
}
