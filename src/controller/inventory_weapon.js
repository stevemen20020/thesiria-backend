const { PrismaClient } = require("@prisma/client");

const Inventory_Weapon = new PrismaClient().inventory_weapon

const getInventoryWeapon = async (req, res) => {
    const id_playable_character = parseInt(req.query.id_playable_character)
    const id_weapon = parseInt(req.query.id_weapon)

    let where = {}

    if(id_playable_character) {
        where.id_user = id_playable_character
    }

    if(id_weapon) {
        where.id_weapon = id_weapon
    }

    try{
        const allInventoryWeapon = await Inventory_Weapon.findMany({
            include: {
                weapon:{
                    include:{
                        elements:true,
                        skill_usage_weapon_skill_usageToskill_usage:true,
                        tiles:true,
                        objects:true
                    }
                },
                playable_character_inventory_weapon_id_userToplayable_character:true
            },
            where:where
        })
        res.status(200).json({result:allInventoryWeapon})
    } catch (e) {
        console.log(e)
    }
}

const getInventoryWeaponById = async (req, res) => {
    try{
        const inventoryWeaponId = parseInt(req.params.id)
        const uniqueInventoryWeapon = await Inventory_Weapon.findUnique({
            where:{
                id:inventoryWeaponId
            },
            include: {
                weapon:{
                    include:{
                        elements:true,
                        skill_usage_weapon_skill_usageToskill_usage:true,
                        tiles:true,
                        objects:true
                    }
                },
                playable_character_inventory_weapon_id_userToplayable_character:true
            }
        })

        if(uniqueInventoryWeapon === null) res.status(404).json({error:'Weapon not found in Inventory'})

        res.status(200).json({result:uniqueInventoryWeapon})
    } catch (e) {
        console.log(e)
    }
}

const insertInventoryWeapon = async(req, res) => {
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

const updateInventoryWeapon = async(req, res) => {
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

const deleteInventoryWeapon = async(req, res) => {
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

module.exports ={
    getInventoryWeapon: getInventoryWeapon,
    getInventoryWeaponById: getInventoryWeaponById,
    insertInventoryWeapon: insertInventoryWeapon,
    updateInventoryWeapon: updateInventoryWeapon,
    deleteInventoryWeapon: deleteInventoryWeapon
}