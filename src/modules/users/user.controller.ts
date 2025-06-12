import { errorResponse } from "../../common/errors/error-response";
import { Request, Response } from "../../infra/http/http.module";

import { UserRepository } from "./repositories/user.repository";
import { CreateUserUseCase } from "./use-cases/create-user.use-case";

export class UserController {
  constructor(private repo: UserRepository) {}

  async create(req: Request, res: Response) {
    try {
      const data = req.body;

      const useCase = new CreateUserUseCase(this.repo);
      const user = await useCase.execute(data);
      res.status(201).json(user);
    } catch (err) {
      errorResponse(res, err);
    }
  }

  async list(_req: Request, res: Response) {
    try {
      const users = await this.repo.findAll();
      res.json(users);
    } catch (err) {
      errorResponse(res, err);
    }
  }
}
