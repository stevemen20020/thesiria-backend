import { CreateUserDto } from "../../dto/auth/createUser.dto";
import { LoginUserDto } from "../../dto/auth/loginUser.dto";
import { UserEntity } from "../../entities/user/user.entity";
import { UserWithTokenEntity } from "../../entities/user/userWithToken.entity";

export interface AuthDatasource {
    register(dto: CreateUserDto):Promise <UserEntity>
    login(dto: LoginUserDto): Promise<UserWithTokenEntity>
}