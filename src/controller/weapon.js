const { PrismaClient } = require("@prisma/client");

const Weapon = new PrismaClient().weapon

const getAllWeapons = async (req, res) => {
    try{
        const allWeapons = await Weapon.findMany({
            include: {
                objects:true,
                skill_usage_weapon_skill_usageToskill_usage:true,
                tiles:true
            }
        })

        res.status(200).json({result:allWeapons})
    } catch (e) {
        console.log(e)
    }
}

const getWeaponById = async (req, res) => {
    try{
        const weaponId = parseInt(req.params.id)
        const uniqueWeapon = await Weapon.findUnique({
            include: {
                objects:true,
                skill_usage_weapon_skill_usageToskill_usage:true,
                tiles:true
            },
            where:{
                id:weaponId
            }
        })

        if(uniqueWeapon === null) res.status(404).json({error:'Weapon not found'})

        res.status(200).json({result:uniqueWeapon})
    } catch (e) {
        console.log(e)
    }
}

const insertWeapon = async(req, res) => {
    try{
        const weaponData = req.body
        const newWeapon = await Weapon.create({
            data:weaponData
        })

        res.status(200).json({result:newWeapon})
    } catch (e) {
        console.log(e)
    }
}

const updateWeapon = async(req, res) => {
    try{
        const weaponData = req.body
        const weaponId = parseInt(req.params.id)

        // Attempt to find the user first
        const existingWeapon = await Weapon.findUnique({
            where: {
                id: weaponId,
            },
        });

        if (!existingWeapon) {
            // If the user doesn't exist, return a 404 response
            return res.status(404).json({ error: "Weapon not found" });
        }

        const newPlayableCharacter = await Weapon.update({
            where:{
                id:weaponId
            },
            data:weaponData
        })

        res.status(200).json({result:newPlayableCharacter})
    } catch (e) {
        console.log(e)
    }
}

const deleteWeapon = async(req, res) => {
    try{
        const weaponId = parseInt(req.params.id)

        // Attempt to find the user first
        const existingWeapon = await Weapon.findUnique({
            where: {
                id: weaponId,
            },
        });

        if (!existingWeapon) {
            // If the user doesn't exist, return a 404 response
            return res.status(404).json({ error: "Weapon not found" });
        }

        const deletedWeapon = await Weapon.delete({
            where:{
                id:weaponId
            },
        })

        res.status(200).json({result:deletedWeapon})
    } catch (e) {
        console.log(e)
    }
}

module.exports ={
    getAllWeapons: getAllWeapons,
    getWeaponById: getWeaponById,
    insertWeapon: insertWeapon,
    updateWeapon: updateWeapon,
    deleteWeapon: deleteWeapon
}