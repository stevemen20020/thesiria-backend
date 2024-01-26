import { PrismaClient } from "@prisma/client"

const Armor = new PrismaClient().armor

export const getAllArmors = async (req, res) => {
    try{
        const allArmors = await Armor.findMany({
            include: {
                objects:true,
                tiles:true,
                skill_usage_armor_skill_usageToskill_usage:true
            }
        })

        res.status(200).json({result:allArmors})
    } catch (e) {
        console.log(e)
    }
}

export const getArmorById = async (req, res) => {
    try{
        const armorId = parseInt(req.params.id)
        const uniqueArmor = await Armor.findUnique({
            include: {
                objects:true,
                tiles:true,
                skill_usage_armor_skill_usageToskill_usage:true
            },
            where:{
                id:armorId
            }
        })

        if(uniqueArmor === null) res.status(404).json({error:'Armor not found'})

        res.status(200).json({result:uniqueArmor})
    } catch (e) {
        console.log(e)
    }
}

export const insertArmor = async(req, res) => {
    try{
        const armorData = req.body
        const newArmor = await Armor.create({
            data:armorData
        })

        res.status(200).json({result:newArmor})
    } catch (e) {
        console.log(e)
    }
}

export const updateArmor = async(req, res) => {
    try{
        const armorData = req.body
        const armorId = parseInt(req.params.id)

        // Attempt to find the user first
        const existingArmor = await Armor.findUnique({
            where: {
                id: armorId,
            },
        });

        if (!existingArmor) {
            // If the user doesn't exist, return a 404 response
            return res.status(404).json({ error: "Armor not found" });
        }

        const editedArmor = await Armor.update({
            where:{
                id:armorId
            },
            data:armorData
        })

        res.status(200).json({result:editedArmor})
    } catch (e) {
        console.log(e)
    }
}

export const deleteArmor = async(req, res) => {
    try{
        const armorId = parseInt(req.params.id)

        // Attempt to find the user first
        const existingArmor = await Armor.findUnique({
            where: {
                id: armorId,
            },
        });

        if (!existingArmor) {
            // If the user doesn't exist, return a 404 response
            return res.status(404).json({ error: "Armor not found" });
        }

        const deletedArmor = await Armor.delete({
            where:{
                id:armorId
            },
        })

        res.status(200).json({result:deletedArmor})
    } catch (e) {
        console.log(e)
    }
}