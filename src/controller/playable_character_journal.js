import { PrismaClient } from "@prisma/client"

const PlayableCharacterJournal = new PrismaClient().playable_character_journal

export const getAllCharactersJournal = async (req, res) => {
    try{
        if('playable_character_id' in req.query) {
            const id_character = parseInt(req.query.playable_character_id)
            const existingPlayableCharacter = await new PrismaClient().playable_character.findUnique({
                where: {
                    id: id_character
                }
            })

            if( existingPlayableCharacter === null ) res.status(404).json({error:'Relationships for character not found'})
            const journal = await PlayableCharacterJournal.findMany({
                include:{
                    playable_character:true,
                    npc:true
                },
                where: {
                    playable_character_id: id_character
                }
            })
            if( journal === null || (await journal).length === 0) res.status(404).json({error:'Character has no relationships assigned'})

            res.status(200).json({result:journal})
        }

        const allPlayableCharactersJournal = await PlayableCharacterJournal.findMany({
            include: {
                playable_character:true,
                npc:true
            }
        })

        res.status(200).json({result:allPlayableCharactersJournal})
    } catch (e) {
        console.log(e)
    }
}

export const getPlayableCharacterJournalById = async (req, res) => {
    try{
        const playableCharacterJournalId = parseInt(req.params.id)
        const uniquePlayableCharacterJournal = await PlayableCharacterJournal.findUnique({
            include: {
                playable_character:true,
                npc:{
                    include:{
                        races:true,
                        affinity:true,
                        haki_types:true, 
                        titanes: true,
                        weapon: {
                            include:{
                                objects:true,
                                elements:true
                            }
                        }
                    }
                }
            },
            where:{
                id:playableCharacterJournalId
            }
        })

        if(uniquePlayableCharacterJournal === null) res.status(404).json({error:'Journal not found'})

        res.status(200).json({result:uniquePlayableCharacterJournal})
    } catch (e) {
        console.log(e)
    }
}

export const insertPlayableCharacterJournalById = async(req, res) => {
    try{
        const playableCharacterJournalData = req.body
        const newPlayableCharacterJournal = await PlayableCharacterJournal.create({
            data:playableCharacterJournalData
        })

        res.status(200).json({result:newPlayableCharacterJournal})
    } catch (e) {
        console.log(e)
    }
}

export const updatePlayableCharacterJournal = async(req, res) => {
    try{
        const playableCharacterJournalData = req.body
        const playableCharacterJournalId = parseInt(req.params.id)

        // Attempt to find the user first
        const existingPlayableCharacterJournal = await PlayableCharacterJournal.findUnique({
            where: {
                id: playableCharacterJournalId,
            },
        });

        if (!existingPlayableCharacterJournal) {
            // If the user doesn't exist, return a 404 response
            return res.status(404).json({ error: "Journal not found" });
        }

        const newPlayableCharacterJournal = await PlayableCharacterJournal.update({
            where:{
                id:playableCharacterJournalId
            },
            data:playableCharacterJournalData
        })

        res.status(200).json({result:newPlayableCharacterJournal})
    } catch (e) {
        console.log(e)
    }
}

export const deletePlayableCharacterJournal = async(req, res) => {
    try{
        const playableCharacterJournalId = parseInt(req.params.id)

        // Attempt to find the user first
        const existingPlayableCharacterJournal = await PlayableCharacterJournal.findUnique({
            where: {
                id: playableCharacterJournalId,
            },
        });

        if (!existingPlayableCharacterJournal) {
            // If the user doesn't exist, return a 404 response
            return res.status(404).json({ error: "Journal not found" });
        }

        const newPlayableCharacterJournal = await PlayableCharacterJournal.delete({
            where:{
                id:playableCharacterJournalId
            },
        })

        res.status(200).json({result:newPlayableCharacterJournal})
    } catch (e) {
        console.log(e)
    }
}