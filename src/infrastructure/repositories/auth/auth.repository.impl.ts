import { AuthRepository } from "../../../domain/repositories/auth/auth.repository";
import { AuthDatasource } from "../../../domain/datasources/auth/auth.datasource";
import { LoginUserDto } from "../../../domain/dto/auth/loginUser.dto";
import { UsersWithTokenEntity } from "../../../domain/entities/users/usersWithTokenEntity";
import { RegisterUserDto } from "../../../domain/dto/auth/registerUser.dto";


export class AuthRepositoryImplementation implements AuthRepository {

    constructor(
        private readonly datasource: AuthDatasource
    ){}
    login(loginUserDto: LoginUserDto): Promise<UsersWithTokenEntity> {
        return this.datasource.login(loginUserDto)
    }
    register(registerUserDto: RegisterUserDto): Promise<UsersWithTokenEntity> {
        return this.datasource.register(registerUserDto)
    }
}