import { getMessages } from "../../../../common/i18n";
import { UserEntity } from "../../entities/user.entity";
import { UserRepository } from "../../repositories/user.repository";
import { UpdateUserUseCase } from "../update-user.use-case";

describe("UpdateUserUseCase", () => {
  const existingUser: UserEntity = new UserEntity({
    id: 1,
    name: "Old Name",
    email: "old@example.com",
  });

  const updatedUser: UserEntity = new UserEntity({
    id: 1,
    name: "New Name",
    email: "new@example.com",
  });

  const mockRepository: jest.Mocked<UserRepository> = {
    findById: jest.fn().mockResolvedValue(existingUser),
    update: jest.fn().mockResolvedValue(updatedUser),
    create: jest.fn(),
    findAll: jest.fn(),
  };

  it("should update user when user exists", async () => {
    const useCase = new UpdateUserUseCase(mockRepository);

    const result = await useCase.execute({
      id: 1,
      name: "New Name",
      email: "new@example.com",
    });

    expect(mockRepository.findById).toHaveBeenCalledWith(1);
    expect(mockRepository.update).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 1,
        name: "New Name",
        email: "new@example.com",
      }),
    );
    expect(result).toEqual(updatedUser);
  });

  it("should throw error if user does not exist", async () => {
    mockRepository.findById.mockResolvedValueOnce(null);

    const useCase = new UpdateUserUseCase(mockRepository);

    const messages = getMessages(); // <-- Pega as mensagens reais usadas no código

    await expect(
      useCase.execute({
        id: 999,
        name: "Any Name",
      }),
    ).rejects.toThrow(messages.errors.database.users.notFound);
  });
});
