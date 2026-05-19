import { SearchUserQueryParamsDto } from "../../dto/user/searchUserQuery.dto";
import { UpdateUserDto } from "../../dto/user/updateUser.dto";
import { UsersEntity } from "../../entities/users/users.entity";

export interface UserDatasource {
    getUserById(id: string) :Promise<UsersEntity>;
    getUsers(queryParams: SearchUserQueryParamsDto): Promise<[UsersEntity[], number]>
    updateUser(dto: UpdateUserDto, id:string): Promise<UsersEntity>
    deleteUser(id:string): Promise<string>
}