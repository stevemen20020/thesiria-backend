import { UserDatasource } from '../../../domain/datasources/user/user.datasource';
import { SearchUserQueryParamsDto } from '../../../domain/dto/user/searchUserQuery.dto';
import { UpdateUserDto } from '../../../domain/dto/user/updateUser.dto';
import { UserEntity } from '../../../domain/entities/user/user.entity';
import { prisma } from '../../../data/database';
import { AppCustomError } from '../../../domain/errors/AppCustom.error';
import { ErrorMessage } from '../../../domain/errors/Messages.error';
import UsersMapper from '../../../domain/mappers/users/users.mapper';

export class UserDatasourceImplementation implements UserDatasource{
    async getUserById(id: string): Promise<UserEntity> {
        const existingUser = await prisma.users.findUnique({
            where:{
                id: Number(id),
            }
        })

        if(!existingUser) throw AppCustomError.badRequest('No user found')
        return UsersMapper.prismaToEntity(existingUser)
    }
    async getUsers(queryParams: SearchUserQueryParamsDto): Promise<[UserEntity[], number]> {
        const { userName, page, limit, } = queryParams

        const userCount = prisma.users.count({
            where:{
                id:{not:0},
                ...(userName && {
                    username:{contains:userName}
                })
            }
        })

        const usersFound = prisma.users.findMany({
            where:{
                id:{not:0},
                ...(userName && {
                    username:{contains:userName}
                })
            },
            take: Number(limit),
            skip: ((Number(page) - 1) * Number(limit))
        })

        const [total, users] = await Promise.all([userCount, usersFound])

        const userEntities = users.map((user) => UsersMapper.prismaToEntity(user))
        return [userEntities, total]
    }
    async updateUser(dto: UpdateUserDto, id: string): Promise<UserEntity> {
        const existUser = await prisma.users.findFirst({
            where: {id: Number(id)}
        })

        if(!existUser) throw AppCustomError.notFound(ErrorMessage.userNotFound)

        const {userName, name, lastName, email} = dto

        if(email) {
            const existingUsername = await prisma.users.findFirst({
                where:{
                    NOT: {id: Number(id)},
                    email:email
                }
            })
            if(existingUsername) throw AppCustomError.badRequest('Email already exists')
        }

        const UpdatedUser = await prisma.users.update({
            where:{id: Number(id)},
            data:{
                name: name ?? undefined,
                username: userName ?? undefined,
                last_name: lastName ?? undefined,
                email: email ?? undefined
            }
        })

        return UsersMapper.prismaToEntity(UpdatedUser)
    }
    async deleteUser(id: string): Promise<string> {
        const existingUser = await prisma.users.findFirst({
            where:{id: Number(id)}
        })

        if(!existingUser) throw AppCustomError.notFound(ErrorMessage.userNotFound)
        
        await prisma.users.delete({
            where:{id: Number(id)}
        })

        return 'Usuario borrado con éxito'
    }
    
}