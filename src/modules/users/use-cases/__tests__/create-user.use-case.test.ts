import { UserEntity } from "../../entities/user.entity";
import { UserRepository } from "../../repositories/user.repository";
import { CreateUserUseCase } from "../create-user.use-case";

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
  };

  it("should create a user and return it", async () => {
    const useCase = new CreateUserUseCase(mockRepository);
    const result = await useCase.execute({
      name: "Gustavo",
      email: "gustavo@example.com",
    });

    expect(result).toEqual(mockUser);
    expect(mockRepository.create).toHaveBeenCalledWith(expect.any(UserEntity));
  });
});
