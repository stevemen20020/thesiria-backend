import { PrismaClient } from "@prisma/client"

const PlayableCharacter = new PrismaClient().playable_character

export const getAllCharacters = async (req, res) => {
    try{
        const allPlayableCharacters = await PlayableCharacter.findMany({
            include: {
                users:true,
                races:true,
                affinity:true,
                inventory_armor_playable_character_armor_idToinventory_armor:true,
                inventory_weapon_playable_character_weapon_idToinventory_weapon:true,
                haki_types:true,
                devil_fruit:true,
                titanes:true
            }
        })

        res.status(200).json({result:allPlayableCharacters})
    } catch (e) {
        console.log(e)
    }
}

export const getPlayableCharacterById = async (req, res) => {
    try{
        const playableCharacterId = parseInt(req.params.id)
        const uniquePlayableCharacter = await PlayableCharacter.findUnique({
            include: {
                users:true,
                races:true,
                affinity:true,
                inventory_armor_playable_character_armor_idToinventory_armor:true,
                inventory_weapon_playable_character_weapon_idToinventory_weapon:true,
                haki_types:true,
                devil_fruit:true,
                titanes:true
            },
            where:{
                id:playableCharacterId
            }
        })

        res.status(200).json({result:uniquePlayableCharacter})
    } catch (e) {
        console.log(e)
    }
}

export const insertPlayableCharacterById = async(req, res) => {
    try{
        const playableCharacterData = req.body
        const newPlayableCharacter = await PlayableCharacter.create({
            data:playableCharacterData
        })

        res.status(200).json({result:newPlayableCharacter})
    } catch (e) {
        console.log(e)
    }
}

export const updatePlayableCharacter = async(req, res) => {
    try{
        const playableCharacterData = req.body
        const playableCharacterId = parseInt(req.params.id)
        const newPlayableCharacter = await PlayableCharacter.update({
            where:{
                id:playableCharacterId
            },
            data:playableCharacterData
        })

        res.status(200).json({result:newPlayableCharacter})
    } catch (e) {
        console.log(e)
    }
}

export const deletePlayableCharacter = async(req, res) => {
    try{
        const playableCharacterId = parseInt(req.params.id)
        const newPlayableCharacter = await PlayableCharacter.delete({
            where:{
                id:playableCharacterId
            },
        })

        res.status(200).json({result:newPlayableCharacter})
    } catch (e) {
        console.log(e)
    }
}