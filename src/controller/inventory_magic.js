const { PrismaClient } = require("@prisma/client");

const Inventory_Magic = new PrismaClient().inventory_magic

const getInventoryMagic = async (req, res) => {
    try{
        const { id_playable_character } = req.query

        let where = {}

        if(id_playable_character) {
            where.id_user = parseInt(id_playable_character)
        }

        const allInventoryMagic = await Inventory_Magic.findMany({
            include: {
                spells:true,
                playable_character:true
            }, where
        })
        res.status(200).json({result:allInventoryMagic})
    } catch (e) {
        console.log(e)
    }
}

const getInventoryMagicById = async (req, res) => {
    try{
        const inventoryMagicId = parseInt(req.params.id)
        const uniqueInventoryMagic = await Inventory_Magic.findUnique({
            where:{
                id:inventoryMagicId
            },
            include: {
                magic:true,
                playable_character_inventory_magic_id_userToplayable_character:true
            }
        })

        if(uniqueInventoryMagic === null) res.status(404).json({error:'Magic not found in Inventory'})

        res.status(200).json({result:uniqueInventoryMagic})
    } catch (e) {
        console.log(e)
    }
}

const insertInventoryMagic = async(req, res) => {
    try{
        const inventoryMagicData = req.body
        const newInventoryMagic = await Inventory_Magic.create({
            data:inventoryMagicData
        })

        res.status(200).json({result:newInventoryMagic})
    } catch (e) {
        console.log(e)
    }
}

const updateInventoryMagic = async(req, res) => {
    try{
        const inventoryMagicData = req.body
        const inventoryMagicId = parseInt(req.params.id)

        // Attempt to find the user first
        const existingInventoryMagic = await Inventory_Magic.findUnique({
            where: {
                id: inventoryMagicId,
            },
        });

        if (!existingInventoryMagic) {
            // If the user doesn't exist, return a 404 response
            return res.status(404).json({ error: "Magic not found in inventory" });
        }

        const editedInventoryMagicId = await Inventory_Magic.update({
            where:{
                id:inventoryMagicId
            },
            data:inventoryMagicData
        })

        res.status(200).json({result:editedInventoryMagicId})
    } catch (e) {
        console.log(e)
    }
}

const deleteInventoryMagic = async(req, res) => {
    try{
        const inventoryMagicId = parseInt(req.params.id)

        // Attempt to find the user first
        const existingInventoryMagic = await Inventory_Magic.findUnique({
            where: {
                id: inventoryMagicId,
            },
        });

        if (!existingInventoryMagic) {
            // If the user doesn't exist, return a 404 response
            return res.status(404).json({ error: "Magic not found in Inventory" });
        }

        const deletedInventoryMagic = await Inventory_Magic.delete({
            where:{
                id:inventoryMagicId
            },
        })

        res.status(200).json({result:deletedInventoryMagic})
    } catch (e) {
        console.log(e)
    }
}

module.exports ={
    getInventoryMagic: getInventoryMagic,
    getInventoryMagicById: getInventoryMagicById,
    insertInventoryMagic: insertInventoryMagic,
    updateInventoryMagic: updateInventoryMagic,
    deleteInventoryMagic: deleteInventoryMagic
}