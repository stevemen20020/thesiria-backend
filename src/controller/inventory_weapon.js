import { PrismaClient } from "@prisma/client"

const Inventory_Weapon = new PrismaClient().inventory_weapon

export const getInventoryWeapon = async (req, res) => {
    try{
        const allInventoryWeapon = await Inventory_Weapon.findMany({
            include: {
                weapon:true,
                playable_character_inventory_weapon_id_userToplayable_character:true
            }
        })
        res.status(200).json({result:allInventoryWeapon})
    } catch (e) {
        console.log(e)
    }
}

export const getInventoryWeaponById = async (req, res) => {
    try{
        const inventoryWeaponId = parseInt(req.params.id)
        const uniqueInventoryWeapon = await Inventory_Weapon.findUnique({
            where:{
                id:inventoryWeaponId
            },
            include: {
                weapon:true,
                playable_character_inventory_weapon_id_userToplayable_character:true
            }
        })

        if(uniqueInventoryWeapon === null) res.status(404).json({error:'Weapon not found in Inventory'})

        res.status(200).json({result:uniqueInventoryWeapon})
    } catch (e) {
        console.log(e)
    }
}

export const insertInventoryWeapon = async(req, res) => {
    try{
        const inventoryWeaponData = req.body
        const newInventoryWeapon = await Inventory_Weapon.create({
            data:inventoryWeaponData
        })

        res.status(200).json({result:newInventoryWeapon})
    } catch (e) {
        console.log(e)
    }
}

export const updateInventoryWeapon = async(req, res) => {
    try{
        const inventoryWeaponData = req.body
        const inventoryWeaponId = parseInt(req.params.id)

        // Attempt to find the user first
        const existingInventoryWeapon = await Inventory_Weapon.findUnique({
            where: {
                id: inventoryWeaponId,
            },
        });

        if (!existingInventoryWeapon) {
            // If the user doesn't exist, return a 404 response
            return res.status(404).json({ error: "Weapon not found in inventory" });
        }

        const editedInventoryWeaponId = await Inventory_Weapon.update({
            where:{
                id:inventoryWeaponId
            },
            data:inventoryWeaponData
        })

        res.status(200).json({result:editedInventoryWeaponId})
    } catch (e) {
        console.log(e)
    }
}

export const deleteInventoryWeapon = async(req, res) => {
    try{
        const inventoryWeaponId = parseInt(req.params.id)

        // Attempt to find the user first
        const existingInventoryWeapon = await Inventory_Weapon.findUnique({
            where: {
                id: inventoryWeaponId,
            },
        });

        if (!existingInventoryWeapon) {
            // If the user doesn't exist, return a 404 response
            return res.status(404).json({ error: "Weapon not found in Inventory" });
        }

        const deletedInventoryWeapon = await Inventory_Weapon.delete({
            where:{
                id:inventoryWeaponId
            },
        })

        res.status(200).json({result:deletedInventoryWeapon})
    } catch (e) {
        console.log(e)
    }
}