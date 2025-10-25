import { UserRepository } from "../../../domain/repositories/user/user.repository";
import { UserDatasource } from "../../../domain/datasources/user/user.datasource";
import { UsersEntity } from "../../../domain/entities";
import { SearchUserQueryParamsDto } from "../../../domain/dto/user/searchUserQuery.dto";
import { UpdateUserDto } from "../../../domain/dto/user/updateUser.dto";


export class UserRepositoryImplementation implements UserRepository {

    constructor(
        private readonly datasource: UserDatasource
    ){}
    getUserById(id: string): Promise<UsersEntity> {
        return this.datasource.getUserById(id)
    }
    getUsers(queryParams: SearchUserQueryParamsDto): Promise<[UsersEntity[], number]> {
        return this.datasource.getUsers(queryParams)
    }
    updateUser(dto: UpdateUserDto, id: string): Promise<UsersEntity> {
        console.log('Entering the hell zone')
        return this.datasource.updateUser(dto, id)
    }
    deleteUser(id: string): Promise<string> {
        return this.datasource.deleteUser(id)
    }
}