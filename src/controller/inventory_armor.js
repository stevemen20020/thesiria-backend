import { PrismaClient } from "@prisma/client"

const Inventory_Armor = new PrismaClient().inventory_armor

export const getInventoryArmor = async (req, res) => {
    try{
        const allInventoryArmor = await Inventory_Armor.findMany({
            include: {
                armor:true,
                playable_character_inventory_armor_id_userToplayable_character:true
            }
        })
        res.status(200).json({result:allInventoryArmor})
    } catch (e) {
        console.log(e)
    }
}

export const getInventoryArmorById = async (req, res) => {
    try{
        const inventoryArmorId = parseInt(req.params.id)
        const uniqueInventoryArmor = await Inventory_Armor.findUnique({
            where:{
                id:inventoryArmorId
            },
            include: {
                armor:true,
                playable_character_inventory_armor_id_userToplayable_character:true
            }
        })

        if(uniqueInventoryArmor === null) res.status(404).json({error:'Armor not found in Inventory'})

        res.status(200).json({result:uniqueInventoryArmor})
    } catch (e) {
        console.log(e)
    }
}

export const insertInventoryArmor = async(req, res) => {
    try{
        const inventoryArmorData = req.body
        const newInventoryArmor = await Inventory_Armor.create({
            data:inventoryArmorData
        })

        res.status(200).json({result:newInventoryArmor})
    } catch (e) {
        console.log(e)
    }
}

export const updateInventoryArmor = async(req, res) => {
    try{
        const inventoryArmorData = req.body
        const inventoryArmorId = parseInt(req.params.id)

        // Attempt to find the user first
        const existingInventoryArmor = await Inventory_Armor.findUnique({
            where: {
                id: inventoryArmorId,
            },
        });

        if (!existingInventoryArmor) {
            // If the user doesn't exist, return a 404 response
            return res.status(404).json({ error: "Armor not found in inventory" });
        }

        const editedInventoryArmorId = await Inventory_Armor.update({
            where:{
                id:inventoryArmorId
            },
            data:inventoryArmorData
        })

        res.status(200).json({result:editedInventoryArmorId})
    } catch (e) {
        console.log(e)
    }
}

export const deleteInventoryArmor = async(req, res) => {
    try{
        const inventoryArmorId = parseInt(req.params.id)

        // Attempt to find the user first
        const existingInventoryArmor = await Inventory_Armor.findUnique({
            where: {
                id: inventoryArmorId,
            },
        });

        if (!existingInventoryArmor) {
            // If the user doesn't exist, return a 404 response
            return res.status(404).json({ error: "Armor not found in Inventory" });
        }

        const deletedInventoryArmor = await Inventory_Armor.delete({
            where:{
                id:inventoryArmorId
            },
        })

        res.status(200).json({result:deletedInventoryArmor})
    } catch (e) {
        console.log(e)
    }
}