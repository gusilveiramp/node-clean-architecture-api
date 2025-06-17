import { errorResponse } from "../../common/errors/error-response";
import { getMessages } from "../../common/i18n";
import { validateRequest } from "../../common/utils/validate-request";
import { Request, Response } from "../../infra/http/http.module";
import { CreateUserSchema } from "./dtos/create-user.dto";
import { UpdateUserParamsSchema, UpdateUserSchema } from "./dtos/update-user.dto";

import { UserRepository } from "./repositories/user.repository";
import { CreateUserUseCase } from "./use-cases/create-user.use-case";
import { UpdateUserUseCase } from "./use-cases/update-user.use-case";
import { FindAllUsersUseCase } from "./use-cases/find-all-users.use-case";

export class UserController {
  constructor(private repo: UserRepository) {}
  private get messages() {
    return getMessages();
  }

  async create(req: Request, res: Response) {
    try {
      const schema = CreateUserSchema(this.messages);
      const parseResult = schema.safeParse(req.body);

      if (!parseResult.success) {
        throw parseResult.error;
      }

      const useCase = new CreateUserUseCase(this.repo);
      const user = await useCase.execute(parseResult.data);
      res.status(201).json(user);
    } catch (err) {
      errorResponse(res, err);
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const { keyword, page, limit } = req.query;

      const useCase = new FindAllUsersUseCase(this.repo);
      const result = await useCase.execute({
        keyword: typeof keyword === "string" ? keyword : undefined,
        page: page ? Number(page) : 1,
        limit: limit ? Number(limit) : 10,
      });

      res.json(result);
    } catch (err) {
      errorResponse(res, err);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const bodySchema = UpdateUserSchema(this.messages);
      const paramsSchema = UpdateUserParamsSchema(this.messages);
      const { body, params } = validateRequest(bodySchema, paramsSchema, req);

      const useCase = new UpdateUserUseCase(this.repo);
      const user = await useCase.execute({
        id: params.user_id,
        ...body,
      });

      res.status(200).json(user);
    } catch (err) {
      errorResponse(res, err);
    }
  }
}
