const { PrismaClient } = require("@prisma/client");

const Mission_Fases = new PrismaClient().mission_fases

const getMissionFases = async (req, res) => {
    try{
        const allMissionFases = await Mission_Fases.findMany({
            include: {
                missions:true
            }
        })
        res.status(200).json({result:allMissionFases})
    } catch (e) {
        console.log(e)
    }
}

const getMissionFasesById = async (req, res) => {
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

const insertMissionFases = async(req, res) => {
    try{
        const missionFasesData = req.body
        const newMissionFases = await Mission_Fases.create({
            data:missionFasesData
        })

        res.status(200).json({result:newMissionFases})
    } catch (e) {
        console.log(e)
    }
}

const updateMissionFases = async(req, res) => {
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

const deleteMissionFases = async(req, res) => {
    try{
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

module.exports ={
    getMissionFases: getMissionFases,
    getMissionFasesById: getMissionFasesById,
    insertMissionFases: insertMissionFases,
    updateMissionFases: updateMissionFases,
    deleteMissionFases: deleteMissionFases
}