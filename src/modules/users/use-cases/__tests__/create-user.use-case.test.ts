import { UserEntity } from "../../entities/user.entity";
import { UserRepository } from "../../repositories/user.repository";
import { CreateUserUseCase } from "../create-user.use-case";
import { QueueInterface } from "../../../../infra/queue/queue.interface";

describe("CreateUserUseCase", () => {
  const mockUser: UserEntity = new UserEntity({
    id: 1,
    name: "Gustavo",
    email: "gustavo@example.com",
  });

  const mockRepository: jest.Mocked<UserRepository> = {
    findById: jest.fn(),
    create: jest.fn().mockResolvedValue(mockUser),
    findAll: jest.fn(),
    update: jest.fn(),
  };

  const mockQueueService: jest.Mocked<QueueInterface> = {
    addEmailJob: jest.fn().mockResolvedValue(undefined),
    close: jest.fn().mockResolvedValue(undefined), // ✅ Precisava disso
  };

  it("should create a user and return it", async () => {
    const useCase = new CreateUserUseCase(mockRepository, mockQueueService);

    const result = await useCase.execute({
      name: "Gustavo",
      email: "gustavo@example.com",
    });

    expect(result).toEqual(mockUser);
    expect(mockRepository.create).toHaveBeenCalledWith(expect.any(UserEntity));
  });

  it("should enqueue a welcome email job", async () => {
    const useCase = new CreateUserUseCase(mockRepository, mockQueueService);

    await useCase.execute({
      name: "Gustavo",
      email: "gustavo@example.com",
    });

    expect(mockQueueService.addEmailJob).toHaveBeenCalledWith({
      to: "gustavo@example.com",
      subject: "Welcome",
      body: expect.stringContaining("Gustavo"),
    });
  });

  it("should not throw if queue service fails", async () => {
    mockQueueService.addEmailJob.mockRejectedValueOnce(new Error("Queue failed"));

    const useCase = new CreateUserUseCase(mockRepository, mockQueueService);

    const result = await useCase.execute({
      name: "Gustavo",
      email: "gustavo@example.com",
    });

    expect(result).toEqual(mockUser);
    expect(mockQueueService.addEmailJob).toHaveBeenCalled();
  });
});
