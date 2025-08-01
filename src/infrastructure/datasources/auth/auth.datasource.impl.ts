import { prisma } from '../../../data/database';
import { AppCustomError } from '../../../domain/errors/AppCustom.error';
import { UserMapper } from '../../../domain/mappers/user/user.mapper';
import { ErrorMessage } from '../../../domain/errors/Messages.error';
import { AuthDatasource } from '../../../domain/datasources/auth/auth.datasource';
import { LoginUserDto } from '../../../domain/dto/auth/loginUser.dto';
import { UserWithTokenEntity } from '../../../domain/entities/user/userWithToken.entity';
import { bcryptAdapter } from '../../../config/bycript.adapter';
import { JwtAdapter } from '../../../config/jwt.adapter';
import { CreateUserDto } from '../../../domain/dto/auth/createUser.dto';
import { UserEntity } from '../../../domain/entities/user/user.entity';

export class AuthDatasourceImplementation implements AuthDatasource{
    async login(loginUserDto:LoginUserDto): Promise<UserWithTokenEntity> {
        const {email, password} = loginUserDto

        const existingUser = await prisma.users.findUnique({
            where:{
                email:email
            }, include: {
                playable_character: {
                    include:{
                        affinity:{ include:{ elements:true } },
                        inventory_armor_inventory_armor_id_userToplayable_character:true,
                        inventory:true,
                        attacks:true,
                        inventory_armor_playable_character_armor_idToinventory_armor:true,
                        inventory_magic:true,
                        inventory_weapon_inventory_weapon_id_userToplayable_character:true,
                        inventory_weapon_playable_character_weapon_idToinventory_weapon:true,
                        haki_types:true,
                        devil_fruit:true,
                        playable_character_journal:true
                    }
                }
            }
        })

        if (!existingUser) throw AppCustomError.notFound(ErrorMessage["emailNotFound"]);
        
        const isPasswordCorrect = bcryptAdapter.compare(password, existingUser.password);

        if(!isPasswordCorrect) throw AppCustomError.badRequest(ErrorMessage["passwordIncorrect"]);

        const token = await JwtAdapter.generateToken({
            id: existingUser.id,
        });

        if (!token) throw AppCustomError.internalServerError(ErrorMessage["jwtNoCreated"]);

        const userEntity = UserMapper.prismaToEntity(existingUser);

        return {
            user: userEntity,
            token: token,
        };
    }

    async register (registerUserDto:CreateUserDto): Promise<UserEntity> {
        const { username, name, last_name, password, email } = registerUserDto

        const existing_email = await prisma.users.findUnique({
            where:{email:email}
        })

        if(existing_email) throw AppCustomError.badRequest(ErrorMessage['emailRepeated'])

        const passwordHashed = bcryptAdapter.hash(password)

        const user = await prisma.users.create({
            data:{
                password:passwordHashed,
                username,
                name,
                last_name,
                email
            }
        })

        const userEntity = UserMapper.prismaToEntity(user)
        return userEntity
    }
    
}