import { PrismaClient } from "@prisma/client"

const Mission_Fases = new PrismaClient().mission_fases

export const getMissionFases = async (req, res) => {
    try{
        const allMissionFases = await Mission_Fases.findMany({
            include: {
                missions:true
            }
        })
        res.status(200).json({result:allMissionsFases})
    } catch (e) {
        console.log(e)
    }
}

export const getMissionFasesById = async (req, res) => {
    try{
        const missionFasesId = parseInt(req.params.id)
        const uniqueMissionFases = await Mission_Fases.findUnique({
            where:{
                id:missionFasesId
            },
            include: {
                missions:true
            }
        })

        if(uniqueMissionFases === null) res.status(404).json({error:'Fase of mission not found'})

        res.status(200).json({result:uniqueMissionFases})
    } catch (e) {
        console.log(e)
    }
}

export const insertMissionFases = async(req, res) => {
    try{
        const missionFasesData = req.body
        const newMissionFases = await MissionFases.create({
            data:missionFasesData
        })

        res.status(200).json({result:newMissionFases})
    } catch (e) {
        console.log(e)
    }
}

export const updateMissionFases = async(req, res) => {
    try{
        const missionFasesData = req.body
        const missionFasesId = parseInt(req.params.id)

        // Attempt to find the user first
        const existingMissionFases = await Mission_Fases.findUnique({
            where: {
                id: missionFasesId,
            },
        });

        if (!existingMissionFases) {
            // If the user doesn't exist, return a 404 response
            return res.status(404).json({ error: "Fase of mission not found" });
        }

        const editedMissionFasesId = await Mission_Fases.update({
            where:{
                id:missionFasesId
            },
            data:missionFasesData
        })

        res.status(200).json({result:editedMissionFasesId})
    } catch (e) {
        console.log(e)
    }
}

export const deleteMissionFases = async(req, res) => {
    try{
        const missionFasesnId = parseInt(req.params.id)

        // Attempt to find the user first
        const existingMissionFases = await Mission_Fases.findUnique({
            where: {
                id: missionFasesId,
            },
        });

        if (!existingMissionFases) {
            // If the user doesn't exist, return a 404 response
            return res.status(404).json({ error: "Fase of mission not found" });
        }

        const deletedMissionFases = await Mission_Fases.delete({
            where:{
                id:missionFasesId
            },
        })

        res.status(200).json({result:deletedMissionFases})
    } catch (e) {
        console.log(e)
    }
}