import { DatabaseModule } from "../../infra/database/database.module";
import { QueueModule } from "../../infra/queue/queue.module";
import { CreateUserUseCase } from "./use-cases/create-user.use-case";
import { FindAllUsersUseCase } from "./use-cases/find-all-users.use-case";
import { UpdateUserUseCase } from "./use-cases/update-user.use-case";
import { UserController } from "./user.controller";

export class UserModule {
  static getUserController(): UserController {
    const userRepository = DatabaseModule.userRepository;
    const queueService = QueueModule.queueService;

    const createUserUseCase = new CreateUserUseCase(userRepository, queueService);
    const updateUserUseCase = new UpdateUserUseCase(userRepository);
    const findAllUsersUseCase = new FindAllUsersUseCase(userRepository);

    return new UserController(createUserUseCase, updateUserUseCase, findAllUsersUseCase);
  }
}
