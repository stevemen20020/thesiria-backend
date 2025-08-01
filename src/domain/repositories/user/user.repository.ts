import { SearchUserQueryParamsDto } from "../../dto/user/searchUserQuery.dto";
import { UpdateUserDto } from "../../dto/user/updateUser.dto";
import { UserEntity } from "../../entities/user/user.entity";

export interface UserRepository {
    getUserById(id: string) :Promise<UserEntity>;
    getUsers(queryParams: SearchUserQueryParamsDto): Promise<[UserEntity[], number]>
    updateUser(dto: UpdateUserDto, id:string): Promise<UserEntity>
    deleteUser(id:string): Promise<string>
}