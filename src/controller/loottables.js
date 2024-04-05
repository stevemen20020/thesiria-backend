const { PrismaClient } = require("@prisma/client");

const Loottables = new PrismaClient().loottables

const getLoottables = async (req, res) => {
    try{
        const allLoottables = await Loottables.findMany({
            include: {
                Object:true,
                monster:true,
                npc:true
            }
        })
        res.status(200).json({result:allLoottables})
    } catch (e) {
        console.log(e)
    }
}

const getLoottablesById = async (req, res) => {
    try{
        const loottablesId = parseInt(req.params.id)
        const uniqueLoottables = await Loottables.findUnique({
            where:{
                id:loottablesId
            },
            include: {
                Object:true,
                monster:true,
                npc:true
            }
        })

        if(uniqueLoottables === null) res.status(404).json({error:'Loottable not found'})

        res.status(200).json({result:uniqueLoottable})
    } catch (e) {
        console.log(e)
    }
}

const insertLoottables = async(req, res) => {
    try{
        const loottablesData = req.body
        const newLoottables = await Loottables.create({
            data:loottables
        })

        res.status(200).json({result:newLoottables})
    } catch (e) {
        console.log(e)
    }
}

const updateLoottables = async(req, res) => {
    try{
        const loottablesData = req.body
        const loottablesId = parseInt(req.params.id)

        // Attempt to find the user first
        const existingLoottables = await Loottables.findUnique({
            where: {
                id: loottablesId,
            },
        });

        if (!existingLoottables) {
            // If the user doesn't exist, return a 404 response
            return res.status(404).json({ error: "Lootable not found" });
        }

        const editedLoottablesId = await Loottables.update({
            where:{
                id:loottablesId
            },
            data:loottablesData
        })

        res.status(200).json({result:editedLoottablesId})
    } catch (e) {
        console.log(e)
    }
}

const deleteLoottables = async(req, res) => {
    try{
        const loottablesId = parseInt(req.params.id)

        // Attempt to find the user first
        const existingLoottables = await Loottables.findUnique({
            where: {
                id: loottablesId,
            },
        });

        if (!existingLootables) {
            // If the user doesn't exist, return a 404 response
            return res.status(404).json({ error: "Weapon not found in Inventory" });
        }

        const deletedLoottables = await Loottables.delete({
            where:{
                id:loottablesId
            },
        })

        res.status(200).json({result:deletedLoottables})
    } catch (e) {
        console.log(e)
    }
}

module.exports ={
    getLoottables: getLoottables,
    getLoottablesById: getLoottablesById,
    insertLoottables: insertLoottables,
    updateLoottables: updateLoottables,
    deleteLoottables: deleteLoottables
}