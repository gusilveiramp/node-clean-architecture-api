import { UserRepository } from "../repositories/user.repository";
import { UserEntity } from "../entities/user.entity";

interface FindAllUsersParams {
  keyword?: string;
  page?: number;
  limit?: number;
}

export class FindAllUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(params: FindAllUsersParams): Promise<{
    users: UserEntity[];
    total: number;
  }> {
    return this.userRepository.findAll(params.keyword, params.page, params.limit);
  }
}
