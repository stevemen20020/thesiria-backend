import { prisma } from '../../../data/database';
import { AppCustomError } from '../../../domain/errors/AppCustom.error';
import { PlayableCharacterMapper } from '../../../domain/mappers';
import { ErrorMessage } from '../../../domain/errors/Messages.error';
import { PlayableCharacterEntity } from '../../../domain/entities';
import { PlayableCharacterDatasource } from '../../../domain/datasources/playableCharacter/playableCharacter.datasource';
import { CreatePlayableCharacterDto } from '../../../domain/dto/playableCharacter/createPlayableCharacter.dto';

export class PlayableCharacterDatasourceImplementation implements PlayableCharacterDatasource{
    async createPlayableCharacter(dto: CreatePlayableCharacterDto): Promise<PlayableCharacterEntity> {
        const {
            userId,
            name,
            biography,
            idRace,
            positiveCharacteristic_1,
            positiveCharacteristic_2,
            positiveCharacteristic_3,
            negativeCharacteristic_1,
            negativeCharacteristic_2 ,
            strength ,
            dexterity ,
            defense ,
            aim ,
            vision ,
            speed ,
            handcraft ,
            agility ,
            charisma ,
            wisdom ,
            affinityId ,
            chroniclerStatus ,
            imageReference ,
            money ,
            health ,
            maxHealth ,
            activeMaxHealth ,
        } = dto

        const existingPlayableCharacter = await prisma.playable_character.findFirst({
            where:{
                OR:[
                    {user_id: Number(userId)},
                    {name:name}
                ]
            }
        })

        if(existingPlayableCharacter) throw AppCustomError.badRequest(ErrorMessage['PlayableCharacterAlreadyExists'])

        const newCharacter = await prisma.playable_character.create({
            data:{
                user_id: Number(userId),
                name,
                biography,
                id_race: Number(idRace),
                positive_characteristic_1:positiveCharacteristic_1,
                positive_characteristic_2:positiveCharacteristic_2,
                positive_characteristic_3:positiveCharacteristic_3,
                negative_characteristic_1:negativeCharacteristic_1,
                negative_characteristic_2:negativeCharacteristic_2,
                strength: Number(strength),
                dexterity: Number(dexterity),
                defense: Number(defense),
                aim: Number(aim),
                vision: Number(vision),
                speed: Number(speed),
                handcraft: Number(handcraft),
                agility: Number(agility),
                charisma: Number(charisma),
                wisdom: Number(wisdom),
                affinity_id: Number(affinityId),
                chronicler_status: Number(chroniclerStatus),
                image_reference: imageReference,
                money: Number(money),
                health: Number(health),
                max_health: Number(maxHealth),
                active_max_health: Number(activeMaxHealth)
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

        return playableCharacterCreatedEntity
    }

    async getById(id: string): Promise<PlayableCharacterEntity> {
        const existingPlayableCharacter = await prisma.playable_character.findUnique({
            where:{
                id: Number(id)
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

        if(!existingPlayableCharacter) throw AppCustomError.notFound(ErrorMessage['PlayableCharacterNotFound'])
        
        const PlayableCharacterToEntity = PlayableCharacterMapper.prismaToEntity(existingPlayableCharacter)

        return PlayableCharacterToEntity
    }
    
}