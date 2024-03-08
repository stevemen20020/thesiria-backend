import { PrismaClient } from "@prisma/client"

const Missions = new PrismaClient().missions

export const getAllMissions = async (req, res) => {
    try{
        const allMissions = await Missions.findMany({
            include: {
                mission_fases:true
            }
        })
        res.status(200).json({result:allMissions})
    } catch (e) {
        console.log(e)
    }
}

export const getMissionsById = async (req, res) => {
    try{
        const missionsId = parseInt(req.params.id)
        const uniqueMissions = await Missions.findUnique({
            where:{
                id:missionsId
            },
            include: {
                mission_fases:true
            }
        })

        if(uniqueMissions === null) res.status(404).json({error:'Missions not found'})

        res.status(200).json({result:uniqueMissions})
    } catch (e) {
        console.log(e)
    }
}

export const insertMissions = async(req, res) => {
    try{
        const missionsData = req.body
        const newMissions = await Missions.create({
            data:missionsData
        })

        res.status(200).json({result:newMissions})
    } catch (e) {
        console.log(e)
    }
}

export const updateMissions = async(req, res) => {
    try{
        const missionsData = req.body
        const missionsId = parseInt(req.params.id)

        // Attempt to find the user first
        const existingMissions = await Missions.findUnique({
            where: {
                id: missionsId,
            },
        });

        if (!existingMissions) {
            // If the user doesn't exist, return a 404 response
            return res.status(404).json({ error: "Mission not found" });
        }

        const editedMissions = await Missions.update({
            where:{
                id:missionsId
            },
            data:missionsData
        })

        res.status(200).json({result:editedMissions})
    } catch (e) {
        console.log(e)
    }
}

export const deleteMissions = async(req, res) => {
    try{
        const missionsId = parseInt(req.params.id)

        // Attempt to find the user first
        const existingMissions = await Missions.findUnique({
            where: {
                id: missionsId,
            },
        });

        if (!existingMissions) {
            // If the user doesn't exist, return a 404 response
            return res.status(404).json({ error: "Mission not found" });
        }

        const deletedMissions = await Missions.delete({
            where:{
                id:missionsId
            },
        })

        res.status(200).json({result:deletedMissions})
    } catch (e) {
        console.log(e)
    }
}