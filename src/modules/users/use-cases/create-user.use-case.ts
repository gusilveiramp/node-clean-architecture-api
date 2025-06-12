import { UserEntity } from "../entities/user.entity";
import { UserRepository } from "../repositories/user.repository";

export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userData: {
    name: string;
    email: string;
  }): Promise<UserEntity> {
    const user = new UserEntity(userData);
    return this.userRepository.create(user);
  }
}
