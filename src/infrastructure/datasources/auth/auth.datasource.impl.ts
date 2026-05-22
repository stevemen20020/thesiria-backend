import { prisma } from '../../../data/database';
import { AppCustomError } from '../../../domain/errors/AppCustom.error';
import { PlayableCharacterMapper, UsersMapper } from '../../../domain/mappers';
import { ErrorMessage } from '../../../domain/errors/Messages.error';
import { AuthDatasource } from '../../../domain/datasources/auth/auth.datasource';
import { LoginUserDto } from '../../../domain/dto/auth/loginUser.dto';
import { UsersWithTokenEntity } from '../../../domain/entities/users/usersWithTokenEntity';
import { bcryptAdapter } from '../../../config/bycript.adapter';
import { JwtAdapter } from '../../../config/jwt.adapter';
import { CreateUserDto } from '../../../domain/dto/auth/createUser.dto';
import { UsersEntity } from '../../../domain/entities';
import { RegisterUserDto } from '../../../domain/dto/auth/registerUser.dto';

export class AuthDatasourceImplementation implements AuthDatasource{
    async login(loginUserDto:LoginUserDto): Promise<UsersWithTokenEntity> {
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

        const userEntity = UsersMapper.prismaToEntity(existingUser);

        return {
            user: userEntity,
            token: token,
        };
    }

    async register (registerUserDto:RegisterUserDto): Promise<UsersWithTokenEntity> {
        const { user, playableCharacter } = registerUserDto

        const existing_email = await prisma.users.findUnique({
            where:{email:user.email}
        })

        if(existing_email) throw AppCustomError.badRequest(ErrorMessage['emailRepeated'])

        const passwordHashed = bcryptAdapter.hash(user.password)

        const registeredUser = await prisma.users.create({
            data:{
                password:passwordHashed,
                email: user.email
            }
        })

        const userEntity = UsersMapper.prismaToEntity(registeredUser)

        const token = await JwtAdapter.generateToken({
            id: userEntity.id,
        });

        if (!token) throw AppCustomError.internalServerError(ErrorMessage["jwtNoCreated"]);

        const newCharacter = await prisma.playable_character.create({
            data:{
                user_id: Number(userEntity.id),
                name: playableCharacter.name,
                id_race: Number(playableCharacter.idRace),
                positive_characteristic_1:playableCharacter.positiveCharacteristic_1,
                positive_characteristic_2:playableCharacter.positiveCharacteristic_2,
                positive_characteristic_3:playableCharacter.positiveCharacteristic_3,
                negative_characteristic_1:playableCharacter.negativeCharacteristic_1,
                negative_characteristic_2:playableCharacter.negativeCharacteristic_2,
                strength: Number(playableCharacter.strength),
                dexterity: Number(playableCharacter.dexterity),
                defense: Number(playableCharacter.defense),
                aim: Number(playableCharacter.aim),
                vision: Number(playableCharacter.vision),
                speed: Number(playableCharacter.speed),
                handcraft: Number(playableCharacter.handcraft),
                agility: Number(playableCharacter.agility),
                charisma: Number(playableCharacter.charisma),
                wisdom: Number(playableCharacter.wisdom),
                affinity_id: Number(playableCharacter.affinityId),
                chronicler_status: Number(playableCharacter.chroniclerStatus),
                money: Number(playableCharacter.money),
                health: Number(playableCharacter.health),
                max_health: Number(playableCharacter.maxHealth),
                active_max_health: Number(playableCharacter.activeMaxHealth)
            }, include: {
                attacks:{
                    include:{
                        skill_usage_attacks_skill_usageToskill_usage:true
                    }
                },
                inventory:{
                    include:{
                        objects:{
                            include:{
                                elements:true
                            }
                        }
                    }
                },
                inventory_armor_inventory_armor_id_userToplayable_character:{
                    include:{
                        armor:{
                            include:{
                                elements:true,
                                objects:true,
                                npc:true
                            }
                        }
                    }
                },
                inventory_armor_playable_character_armor_idToinventory_armor:{
                    include:{
                        armor:{
                            include:{

                                elements:true,
                                objects:true,
                                npc:true
                            }
                        }
                    }
                },
                inventory_magic:{
                    include:{
                        spells:{
                            include:{
                                objects:true,
                                skill_usage_spells_skill_usageToskill_usage:true,
                                effects:true,
                            }
                        }
                    }
                },
                inventory_weapon_inventory_weapon_id_userToplayable_character:{
                    include:{
                        weapon:{
                            include:{
                                elements:true,
                                objects:true,
                                npc:true
                            }
                        }
                    }
                },
                inventory_weapon_playable_character_weapon_idToinventory_weapon:{
                    include:{
                        weapon:{
                            include:{
                                elements:true,
                                objects:true,
                                npc:true
                            }
                        }
                    }
                },
                races:true,
                affinity:{
                    include:{
                        elements:true
                    }
                },
                haki_types:true,
                devil_fruit:true,
                playable_character_journal:{
                    include:{
                        npc:true
                    }
                },
                mission_journal:{
                    include:{
                        missions:{
                            include:{
                                mission_fases:true
                            }
                        }
                    }
                }
            }
        })

        const playableCharacterCreatedEntity = PlayableCharacterMapper.prismaToEntity(newCharacter)

        return {
            user:userEntity,
            token:token,
            playableCharacter:playableCharacterCreatedEntity
        }
    }
    
}