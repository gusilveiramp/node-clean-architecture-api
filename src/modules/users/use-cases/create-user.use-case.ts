import { UserEntity } from "../entities/user.entity";
import { UserRepository } from "../repositories/user.repository";
import { QueueInterface } from "../../../infra/queue/queue.interface";

export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly queueService: QueueInterface,
  ) {}

  async execute(userData: { name: string; email: string }): Promise<UserEntity> {
    const user = new UserEntity(userData);
    const createdUser = await this.userRepository.create(user);

    try {
      // Envia o e-mail de boas-vindas
      await this.queueService.addEmailJob({
        to: createdUser.email,
        subject: "Welcome",
        body: `Hellow ${createdUser.name}, welcome to our platform!`,
      });
    } catch (error) {
      console.error("❌ Failed to enqueue email job for user:", {
        userId: createdUser.id,
        error,
      });
    }

    return createdUser;
  }
}
