import { UserEntity } from "../../entities/user.entity";
import { UserRepository } from "../../repositories/user.repository";
import { FindAllUsersUseCase } from "../find-all-users.use-case";

describe("FindAllUsersUseCase", () => {
  const mockUserList: UserEntity[] = [
    new UserEntity({ id: 1, name: "Gustavo", email: "gustavo@example.com" }),
    new UserEntity({ id: 2, name: "Maria", email: "maria@example.com" }),
  ];

  const mockRepository: jest.Mocked<UserRepository> = {
    findById: jest.fn(),
    create: jest.fn(),
    findAll: jest.fn().mockResolvedValue({
      users: mockUserList,
      total: 2,
    }),
    update: jest.fn(),
  };

  it("should return all users with total count", async () => {
    const useCase = new FindAllUsersUseCase(mockRepository);

    const result = await useCase.execute({ keyword: "", page: 1, limit: 10 });

    expect(result.users).toEqual(mockUserList);
    expect(result.total).toBe(2);
    expect(mockRepository.findAll).toHaveBeenCalledWith("", 1, 10);
  });
});
