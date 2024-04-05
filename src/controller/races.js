const { PrismaClient } = require("@prisma/client");

const Race = new PrismaClient().races

const getAllRaces = async (req, res) => {
    try{
        const allRaces = await Race.findMany()

        res.status(200).json({result:allRaces})
    } catch (e) {
        console.log(e)
    }
}

const getRaceById = async (req, res) => {
    try{
        const raceId = parseInt(req.params.id)
        const uniqueRace = await Race.findUnique({
            where:{
                id:raceId
            }
        })

        if(uniqueRace === null) res.status(404).json({error:'Race not found'})

        res.status(200).json({result:uniqueRace})
    } catch (e) {
        console.log(e)
    }
}

const insertRace = async(req, res) => {
    try{
        const raceData = req.body
        const newRace = await Race.create({
            data:raceData
        })

        res.status(200).json({result:newRace})
    } catch (e) {
        console.log(e)
    }
}

const updateRace = async(req, res) => {
    try{
        const raceData = req.body
        const raceId = parseInt(req.params.id)

        // Attempt to find the user first
        const existingRace = await Race.findUnique({
            where: {
                id: raceId,
            },
        });

        if (!existingRace) {
            // If the user doesn't exist, return a 404 response
            return res.status(404).json({ error: "Race not found" });
        }

        const editedRace = await Race.update({
            where:{
                id:raceId
            },
            data:raceData
        })

        res.status(200).json({result:editedRace})
    } catch (e) {
        console.log(e)
    }
}

const deleteRace = async(req, res) => {
    try{
        const raceId = parseInt(req.params.id)

        // Attempt to find the user first
        const existingRace = await Race.findUnique({
            where: {
                id: raceId,
            },
        });

        if (!existingRace) {
            // If the user doesn't exist, return a 404 response
            return res.status(404).json({ error: "Race not found" });
        }

        const deletedRace = await Race.delete({
            where:{
                id:raceId
            },
        })

        res.status(200).json({result:deletedRace})
    } catch (e) {
        console.log(e)
    }
}

module.exports ={
    getAllRaces: getAllRaces,
    getRaceById: getRaceById,
    insertRace: insertRace,
    updateRace: updateRace,
    deleteRace: deleteRace
}