import { UserRepository } from "../../../domain/repositories/user/user.repository";
import { UserDatasource } from "../../../domain/datasources/user/user.datasource";
import { UserEntity } from "../../../domain/entities/user/user.entity";
import { SearchUserQueryParamsDto } from "../../../domain/dto/user/searchUserQuery.dto";
import { UpdateUserDto } from "../../../domain/dto/user/updateUser.dto";


export class UserRepositoryImplementation implements UserRepository {

    constructor(
        private readonly datasource: UserDatasource
    ){}
    getUserById(id: string): Promise<UserEntity> {
        return this.datasource.getUserById(id)
    }
    getUsers(queryParams: SearchUserQueryParamsDto): Promise<[UserEntity[], number]> {
        return this.datasource.getUsers(queryParams)
    }
    updateUser(dto: UpdateUserDto, id: string): Promise<UserEntity> {
        return this.updateUser(dto, id)
    }
    deleteUser(id: string): Promise<string> {
        return this.deleteUser(id)
    }
}