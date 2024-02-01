import { PrismaClient } from "@prisma/client"

const Dungeon = new PrismaClient().dungeons

export const getAllDungeons = async (req, res) => {
    try{
        const allDungeons = await Dungeon.findMany({
            include: {
                tiles_dungeons_location_idTotiles:true
            }
        })

        res.status(200).json({result:allDungeons})
    } catch (e) {
        console.log(e)
    }
}

export const getDungeonById = async (req, res) => {
    try{
        const dungeonId = parseInt(req.params.id)
        const uniqueDungeon = await Dungeon.findUnique({
            include: {
                tiles_dungeons_location_idTotiles:true
            },
            where:{
                id:dungeonId
            }
        })

        if(uniqueDungeon === null) res.status(404).json({error:'Dungeon not found'})

        res.status(200).json({result:uniqueDungeon})
    } catch (e) {
        console.log(e)
    }
}

export const insertDungeon = async(req, res) => {
    try{
        const dungeonData = req.body
        const newDungeon = await Dungeon.create({
            data:dungeonData
        })

        res.status(200).json({result:newDungeon})
    } catch (e) {
        console.log(e)
    }
}

export const updateDungeon = async(req, res) => {
    try{
        const dungeonData = req.body
        const dungeonId = parseInt(req.params.id)

        // Attempt to find the user first
        const existingDungeon = await Dungeon.findUnique({
            where: {
                id: dungeonId,
            },
        });

        if (!existingDungeon) {
            // If the user doesn't exist, return a 404 response
            return res.status(404).json({ error: "Dungeon not found" });
        }

        const editedDungeon = await Dungeon.update({
            where:{
                id:dungeonId
            },
            data:dungeonData
        })

        res.status(200).json({result:editedDungeon})
    } catch (e) {
        console.log(e)
    }
}

export const deleteDungeon = async(req, res) => {
    try{
        const dungeonId = parseInt(req.params.id)

        // Attempt to find the user first
        const existingDungeon = await Dungeon.findUnique({
            where: {
                id: dungeonId,
            },
        });

        if (!existingDungeon) {
            // If the user doesn't exist, return a 404 response
            return res.status(404).json({ error: "Dungeon not found" });
        }

        const deletedDungeon = await Dungeon.delete({
            where:{
                id:dungeonId
            },
        })

        res.status(200).json({result:deletedDungeon})
    } catch (e) {
        console.log(e)
    }
}