import { User } from "@prisma/client";
import { UserEntity } from "../../../../modules/users/entities/user.entity";

export class PrismaUserMapper {
  // Convert UserEntity → Prisma format
  static toPrisma(product: UserEntity) {
    return {
      name: product.name,
      email: product.email,
    };
  }
  // Convert Prisma response → UserEntity
  static toEntity(user: User): UserEntity {
    return new UserEntity({
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.createdAt,
      updated_at: user.updatedAt,
      deleted_at: user.deletedAt,
    });
  }
}
