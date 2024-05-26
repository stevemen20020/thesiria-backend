const { PrismaClient } = require("@prisma/client");

const Inventory = new PrismaClient().inventory

const getInventory = async (req, res) => {
    const id_playable_character = parseInt(req.query.id_playable_character)
    const id_object = parseInt(req.query.id_object)

    let where = {}

    if(id_playable_character) {
        where.id_playable_character = id_playable_character
    }

    if(id_object) {
        where.id_object = id_object
    }

    try{
        const allInventory = await Inventory.findMany({
            include: {
                playable_character:true,
                objects:true
            },
            where:where
        })
        res.status(200).json({result:allInventory})
    } catch (e) {
        console.log(e)
    }
}

const getInventoryById = async (req, res) => {
    try{
        const inventoryId = parseInt(req.params.id)
        const uniqueInventory = await Inventory.findUnique({
            where:{
                id:inventoryId
            },
            include: {
                playable_character:true,
                objects:true
            }
        })

        if(uniqueInventory === null) res.status(404).json({error:'Inventory not found'})

        res.status(200).json({result:uniqueInventory})
    } catch (e) {
        console.log(e)
    }
}

const insertInventory = async(req, res) => {
    try{
        const inventoryData = req.body
        const newInventory = await Inventory.create({
            data:inventoryData
        })

        res.status(200).json({result:newInventory})
    } catch (e) {
        console.log(e)
    }
}

const updateInventory = async(req, res) => {
    try{
        const inventoryData = req.body
        const inventoryId = parseInt(req.params.id)

        // Attempt to find the user first
        const existingInventory = await Inventory.findUnique({
            where: {
                id: inventoryId,
            },
        });

        if (!existingInventory) {
            // If the user doesn't exist, return a 404 response
            return res.status(404).json({ error: "Inventory not found" });
        }

        const editedInventoryId = await Inventory.update({
            where:{
                id:inventoryId
            },
            data:inventoryData
        })

        res.status(200).json({result:editedInventoryId})
    } catch (e) {
        console.log(e)
    }
}

const updateInventoryForPlayer = async(req, res) => {
    try{
        const quantity = parseInt(req.body.quantity)
        const id_playable_character = parseInt(req.body.id_playable_character)
        const id_object = parseInt(req.body.id_object)
        const editedInventory = await Inventory.update({
            data:{
                quantity:quantity
            },
            where:{
                id_playable_character:id_playable_character,
                id_object:id_object
            }
        })

        if (!editedInventory) {
            // If the user doesn't exist, return a 404 response
            return res.status(404).json({ error: "Inventory not found" });
        }

        res.status(200).json({result:editedInventory})
    } catch (e) {
        console.log(e)
    }
}

const deleteInventory = async(req, res) => {
    try{
        const inventoryId = parseInt(req.params.id)

        // Attempt to find the user first
        const existingInventory = await Inventory.findUnique({
            where: {
                id: inventoryId,
            },
        });

        if (!existingInventory) {
            // If the user doesn't exist, return a 404 response
            return res.status(404).json({ error: "Inventory not found" });
        }

        const deletedInventory = await Inventory.delete({
            where:{
                id:inventoryId
            },
        })

        res.status(200).json({result:deletedInventory})
    } catch (e) {
        console.log(e)
    }
}

module.exports ={
    getInventory: getInventory,
    getInventoryById: getInventoryById,
    insertInventory: insertInventory,
    updateInventory: updateInventory,
    deleteInventory: deleteInventory,
    updateInventoryForPlayer: updateInventoryForPlayer
}