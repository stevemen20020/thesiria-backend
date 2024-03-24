import { PrismaClient } from "@prisma/client"

const Mission_Journal = new PrismaClient().mission_journal

export const getMissionJournal = async (req, res) => {
    try{
        if('playable_character_id' in req.query) {
            const id_character = parseInt(req.query.playable_character_id)
            const existingPlayableCharacter = await new PrismaClient().playable_character.findUnique({
                where: {
                    id: id_character
                }
            })

            if( existingPlayableCharacter === null ) res.status(404).json({error:'Journal for character not found'})
            const journal = await Mission_Journal.findMany({
                include:{
                    missions:{
                        include:{
                            npc:true,
                            mission_fases:{
                                orderBy: {
                                    fase:'asc'
                                }
                            }
                        }
                    }
                },
                where: {
                    playable_character_id: id_character
                }
            })

            if( journal === null || (await journal).length === 0) res.status(404).json({error:'Character has no missions assigned'})

            res.status(200).json({result:journal})
        }
        const allMissionJournal = await Mission_Journal.findMany({
            include: {
                missions:{
                    include:{
                        npc:true,
                        mission_fases:{
                            orderBy: {
                                fase:'asc'
                            }
                        }
                    }
                },
                playable_character:true
            }
        })
        res.status(200).json({result:allMissionJournal})
    } catch (e) {
        console.log(e)
    }
}

export const getMissionJournalById = async (req, res) => {
    try{
        const missionJournalId = parseInt(req.params.id)
        const uniqueMissionJournal = await Mission_Journal.findUnique({
            where:{
                id:missionJournalId
            },
            include: {
                missions:{
                    include:{
                        npc:true,
                        mission_fases:{
                            orderBy: {
                                fase:'asc'
                            }
                        }
                    }
                },
                playable_character:true
            }
        })

        if(uniqueMissionJournal === null) res.status(404).json({error:'Journal not found'})

        res.status(200).json({result:uniqueMissionJournal})
    } catch (e) {
        console.log(e)
    }
}

export const insertMissionJournal = async(req, res) => {
    try{
        const missionJournalData = req.body
        const newMissionJournal = await Mission_Journal.create({
            data:missionJournalData
        })

        res.status(200).json({result:newMissionJournal})
    } catch (e) {
        console.log(e)
    }
}

export const updateMissionJournal = async(req, res) => {
    try{
        const missionJournalData = req.body
        const missionJournalId = parseInt(req.params.id)

        // Attempt to find the user first
        const existingMissionJournal = await Mission_Journal.findUnique({
            where: {
                id: missionJournalId,
            },
        });

        if (!existingMissionJournal) {
            // If the user doesn't exist, return a 404 response
            return res.status(404).json({ error: "Journal not found" });
        }

        const editedMissionJournalId = await Mission_Journal.update({
            where:{
                id:missionJournalId
            },
            data:missionJournalData
        })

        res.status(200).json({result:editedMissionJournalId})
    } catch (e) {
        console.log(e)
    }
}

export const deleteMissionJournal = async(req, res) => {
    try{
        const missionJournalId = parseInt(req.params.id)

        // Attempt to find the user first
        const existingMissionJournal = await Mission_Journal.findUnique({
            where: {
                id: missionJournalId,
            },
        });

        if (!existingMissionJournal) {
            // If the user doesn't exist, return a 404 response
            return res.status(404).json({ error: "Journal not found" });
        }

        const deletedMissionJournal = await Mission_Journal.delete({
            where:{
                id:missionJournalId
            },
        })

        res.status(200).json({result:deletedMissionJournal})
    } catch (e) {
        console.log(e)
    }
}