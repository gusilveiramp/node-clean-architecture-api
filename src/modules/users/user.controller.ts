import { errorResponse } from "../../common/errors/error-response";
import { getMessages } from "../../common/i18n";
import { validateRequest } from "../../common/utils/validate-request";
import { Request, Response } from "../../infra/http/http.module";
import { CreateUserSchema } from "./dtos/create-user.dto";
import { UpdateUserParamsSchema, UpdateUserSchema } from "./dtos/update-user.dto";

import { CreateUserUseCase } from "./use-cases/create-user.use-case";
import { UpdateUserUseCase } from "./use-cases/update-user.use-case";
import { FindAllUsersUseCase } from "./use-cases/find-all-users.use-case";

export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly findAllUsersUseCase: FindAllUsersUseCase,
  ) {}

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

      const user = await this.createUserUseCase.execute(parseResult.data);
      res.status(201).json(user);
    } catch (err) {
      errorResponse(res, err);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const bodySchema = UpdateUserSchema(this.messages);
      const paramsSchema = UpdateUserParamsSchema(this.messages);
      const { body, params } = validateRequest(bodySchema, paramsSchema, req);

      const user = await this.updateUserUseCase.execute({
        id: params.user_id,
        ...body,
      });

      res.status(200).json(user);
    } catch (err) {
      errorResponse(res, err);
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const { keyword, page, limit } = req.query;

      const result = await this.findAllUsersUseCase.execute({
        keyword: typeof keyword === "string" ? keyword : undefined,
        page: page ? Number(page) : 1,
        limit: limit ? Number(limit) : 10,
      });

      res.json(result);
    } catch (err) {
      errorResponse(res, err);
    }
  }
}
