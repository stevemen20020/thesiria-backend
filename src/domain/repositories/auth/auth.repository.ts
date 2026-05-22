import { LoginUserDto } from "../../dto/auth/loginUser.dto";
import { RegisterUserDto } from "../../dto/auth/registerUser.dto";
import { UsersWithTokenEntity } from "../../entities/users/usersWithTokenEntity";


export interface AuthRepository {
    register(dto: RegisterUserDto):Promise <UsersWithTokenEntity>
    login(dto: LoginUserDto): Promise<UsersWithTokenEntity>
}