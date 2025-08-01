// infrastructure/mappers/user.mapper.ts

import { users, Prisma } from "@prisma/client";
import { UserEntity } from "../../entities/user/user.entity";

export class UserMapper {
  static prismaToEntity(user: Prisma.usersGetPayload<{include:{playable_character:true}}>): UserEntity {
    const userMapped: UserEntity = {
      id: user.id.toString(),
      userName: user.username,
      name: user.name,
      lastName: user.last_name,
      email: user.email,

      // playableCharacter: user.playable_character ? user.playable_character : undefined
    };

    return userMapped
  }

  static entityToPrisma(user: UserEntity): users {
    // ⚠️ Esto requiere que definas un tipo compatible (users sin relaciones)
    return {
      id: Number(user.id),
      username: user.userName,
      name: user.name ?? null,
      last_name: user.lastName,
      email: user.email,
      password: user.password,
    } as users;
  }
}
