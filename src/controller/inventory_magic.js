import { PrismaClient } from "@prisma/client"

const Inventory_Magic = new PrismaClient().inventory_magic

export const getInventoryMagic = async (req, res) => {
    try{
        const allInventoryMagic = await Inventory_Magic.findMany({
            include: {
                magic:true,
                playable_character_inventory_magic_id_userToplayable_character:true
            }
        })
        res.status(200).json({result:allInventoryMagic})
    } catch (e) {
        console.log(e)
    }
}

export const getInventoryMagicById = async (req, res) => {
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

export const insertInventoryMagic = async(req, res) => {
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

export const updateInventoryMagic = async(req, res) => {
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

export const deleteInventoryMagic = async(req, res) => {
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