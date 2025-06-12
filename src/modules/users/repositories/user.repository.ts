import { UserEntity } from "../entities/user.entity";

export interface UserRepository {
  findById(id: number): Promise<UserEntity | null>;
  create(user: UserEntity): Promise<UserEntity>;
  findAll(
    keyword?: string,
    page?: number,
    limit?: number,
  ): Promise<{ users: UserEntity[]; total: number }>;
}
