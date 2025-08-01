import { UserEntity } from "./user.entity";

export interface UserWithTokenEntity {
    user: UserEntity,
    token:string
}