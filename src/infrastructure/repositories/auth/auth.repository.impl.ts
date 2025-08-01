import { UserEntity } from "../../../domain/entities/user/user.entity";
import { AuthRepository } from "../../../domain/repositories/auth/auth.repository";
import { AuthDatasource } from "../../../domain/datasources/auth/auth.datasource";
import { LoginUserDto } from "../../../domain/dto/auth/loginUser.dto";
import { CreateUserDto } from "../../../domain/dto/auth/createUser.dto";
import { UserWithTokenEntity } from "../../../domain/entities/user/userWithToken.entity";


export class AuthRepositoryImplementation implements AuthRepository {

    constructor(
        private readonly datasource: AuthDatasource
    ){}
    login(loginUserDto: LoginUserDto): Promise<UserWithTokenEntity> {
        return this.datasource.login(loginUserDto)
    }
    register(registerUserDto: CreateUserDto): Promise<UserEntity> {
        return this.datasource.register(registerUserDto)
    }
}