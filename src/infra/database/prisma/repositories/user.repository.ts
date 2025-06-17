// src/infra/database/prisma/user.repository.ts
import { UserEntity } from "../../../../modules/users/entities/user.entity";
import { UserRepository } from "../../../../modules/users/repositories/user.repository";
import { PrismaUserMapper } from "../mappers/user.mapper";
import { PrismaService } from "../prisma.service";

export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async update(user: UserEntity): Promise<UserEntity> {
    const updatedUser = await this.prismaService.user.update({
      where: { id: user.id },
      data: PrismaUserMapper.toPrisma(user),
    });

    return PrismaUserMapper.toEntity(updatedUser);
  }

  async findAll(
    keyword?: string,
    page = 1,
    limit = 10,
  ): Promise<{ users: UserEntity[]; total: number }> {
    const sanitizedLimit = Number(limit);
    const skip = (page - 1) * sanitizedLimit;
    const sanitizedKeyword = keyword?.trim().replace(/^"|"$/g, "");

    // Fetch users with search filter
    const users = await this.prismaService.user.findMany({
      where: {
        deletedAt: null,
        ...(sanitizedKeyword
          ? {
              name: {
                contains: sanitizedKeyword,
                mode: "insensitive",
              },
            }
          : {}),
      },
      skip,
      take: sanitizedLimit,
    });

    // Count total records
    const total = await this.prismaService.user.count({
      where: {
        deletedAt: null,
        ...(sanitizedKeyword
          ? {
              name: {
                contains: sanitizedKeyword,
                mode: "insensitive",
              },
            }
          : {}),
      },
    });

    return {
      users: users.map(PrismaUserMapper.toEntity),
      total,
    };
  }

  async findById(id: number): Promise<UserEntity | null> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });
    return user ? PrismaUserMapper.toEntity(user) : null;
  }

  async create(user: UserEntity): Promise<UserEntity> {
    const createdUser = await this.prismaService.user.create({
      data: PrismaUserMapper.toPrisma(user),
    });
    return PrismaUserMapper.toEntity(createdUser);
  }
}
