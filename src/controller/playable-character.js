const { PrismaClient } = require("@prisma/client");

const PlayableCharacter = new PrismaClient().playable_character

const getAllCharacters = async (req, res) => {
    try{
        const allPlayableCharacters = await PlayableCharacter.findMany({
            include: {
                affinity:true,
                users:true,
                races:true,
                affinity:true,
                inventory_armor_playable_character_armor_idToinventory_armor:{
                    include:{
                        armor:true
                    }
                },
                inventory_weapon_playable_character_weapon_idToinventory_weapon:{
                    include:{
                        weapon:true
                    }
                },
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

const getPlayableCharacterById = async (req, res) => {
    try{
        const playableCharacterId = parseInt(req.params.id)
        const uniquePlayableCharacter = await PlayableCharacter.findUnique({
            include: {
                users:true,
                races:true,
                affinity:true,
                inventory_armor_playable_character_armor_idToinventory_armor:{
                    include:{
                        armor:{
                            include:{
                                elements: true,
                                skill_usage_armor_skill_usageToskill_usage: true,
                                tiles: true,
                                objects: true
                            }
                        }
                    }
                },
                inventory_weapon_playable_character_weapon_idToinventory_weapon:{
                    include:{
                        weapon:{
                            include:{
                                elements:true,
                                skill_usage_weapon_skill_usageToskill_usage:true,
                                tiles:true,
                                objects:true
                            }
                        }
                    }
                },
                haki_types:true,
                devil_fruit:true,
                titanes:true
            },
            where:{
                id:playableCharacterId
            }
        })

        if(uniquePlayableCharacter === null) res.status(404).json({error:'Character not found'})

        res.status(200).json({result:uniquePlayableCharacter})
    } catch (e) {
        console.log(e)
    }
}

const insertPlayableCharacterById = async(req, res) => {
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

const updatePlayableCharacter = async(req, res) => {
    try{
        const playableCharacterData = req.body
        const playableCharacterId = parseInt(req.params.id)

        // Attempt to find the user first
        const existingPlayableCharacter = await PlayableCharacter.findUnique({
            where: {
                id: playableCharacterId,
            },
        });

        if (!existingPlayableCharacter) {
            // If the user doesn't exist, return a 404 response
            return res.status(404).json({ error: "Character not found" });
        }

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

const deletePlayableCharacter = async(req, res) => {
    try{
        const playableCharacterId = parseInt(req.params.id)

        // Attempt to find the user first
        const existingPlayableCharacter = await PlayableCharacter.findUnique({
            where: {
                id: playableCharacterId,
            },
        });

        if (!existingPlayableCharacter) {
            // If the user doesn't exist, return a 404 response
            return res.status(404).json({ error: "Character not found" });
        }

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

const giftMoney = async(req, res) => {
    try{
        const {money, giftingPlayer, giftedPlayer} = req.body

        // Attempt to find the user first
        const existingGiftingCharacter = await PlayableCharacter.findUnique({
            where: {
                id: parseInt(giftingPlayer),
            },
        });

        if (!existingGiftingCharacter) {
            return res.status(404).json({ error: "Character gifting not found" });
        }

        const existingGiftedCharacter = await PlayableCharacter.findUnique({
            where: {
                id: parseInt(giftedPlayer),
            },
        });

        if (!existingGiftedCharacter) {
            return res.status(404).json({ error: "Character gifted not found" });
        }

        const lostMoney = existingGiftingCharacter.money - parseFloat(money)
        const gainedMoney = existingGiftedCharacter.money + parseFloat(money)

        await PlayableCharacter.update({
            where:{
                id:parseInt(giftingPlayer)
            }, data: {
                money: parseFloat(lostMoney)
            }
        })

        await PlayableCharacter.update({
            where:{
                id:parseInt(giftedPlayer)
            }, data: {
                money: parseFloat(gainedMoney)
            }
        })

        res.status(200).json({result:{lostMoney, gainedMoney}})
    } catch (e) {
        console.log(e)
    }
}

module.exports ={
    getAllCharacters: getAllCharacters,
    getPlayableCharacterById: getPlayableCharacterById,
    insertPlayableCharacterById: insertPlayableCharacterById,
    updatePlayableCharacter: updatePlayableCharacter,
    deletePlayableCharacter: deletePlayableCharacter,
    giftMoney: giftMoney
}