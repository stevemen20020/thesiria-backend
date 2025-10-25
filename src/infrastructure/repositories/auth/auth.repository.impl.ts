import { UsersEntity } from "../../../domain/entities";
import { AuthRepository } from "../../../domain/repositories/auth/auth.repository";
import { AuthDatasource } from "../../../domain/datasources/auth/auth.datasource";
import { LoginUserDto } from "../../../domain/dto/auth/loginUser.dto";
import { CreateUserDto } from "../../../domain/dto/auth/createUser.dto";
import { UsersWithTokenEntity } from "../../../domain/entities/users/usersWithTokenEntity";


export class AuthRepositoryImplementation implements AuthRepository {

    constructor(
        private readonly datasource: AuthDatasource
    ){}
    login(loginUserDto: LoginUserDto): Promise<UsersWithTokenEntity> {
        return this.datasource.login(loginUserDto)
    }
    register(registerUserDto: CreateUserDto): Promise<UsersEntity> {
        return this.datasource.register(registerUserDto)
    }
}