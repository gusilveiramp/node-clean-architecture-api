// src/modules/users/use-cases/update-user.use-case.ts

import { UserRepository } from "../repositories/user.repository";
import { UserEntity } from "../entities/user.entity";
import { UpdateUserDTO } from "../dtos/update-user.dto";
import { getMessages } from "../../../common/i18n";
import { CustomError } from "../../../common/errors/custom-error";

export class UpdateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(data: UpdateUserDTO): Promise<UserEntity> {
    const existingUser = await this.userRepository.findById(data.id);
    if (!existingUser) {
      const messages = getMessages();
      throw new CustomError(messages.errors.database.users.notFound, 404);
    }

    const updatedUser = new UserEntity({
      ...existingUser,
      ...data,
    });

    return this.userRepository.update(updatedUser);
  }
}
