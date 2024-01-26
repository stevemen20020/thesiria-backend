import { PrismaClient } from "@prisma/client"

const NPC = new PrismaClient().playable_character

export const getAllNPCs = async (req, res) => {
    try{
        const allNPCs = await NPC.findMany({
            include: {
                //races:true,
                affinity:true,
                inventory_armor_inventory_armor_id_userToplayable_character:true,
                inventory_weapon_inventory_weapon_id_userToplayable_character:true,
                haki_types:true,
                devil_fruit:true,
                titanes:true,
            }
        })

        res.status(200).json({result:allNPCs})
    } catch (e) {
        console.log(e)
    }
}

export const getNPCById = async (req, res) => {
    try{
        const NPCId = parseInt(req.params.id)
        const uniqueNPC = await NPC.findUnique({
            include: {
                //races:true,
                affinity:true,
                inventory_armor_inventory_armor_id_userToplayable_character:true,
                inventory_weapon_inventory_weapon_id_userToplayable_character:true,
                haki_types:true,
                devil_fruit:true,
                titanes:true,
            },
            where:{
                id:NPCId
            }
        })

        if(uniqueNPC === null) res.status(404).json({error:'NPC not found'})

        res.status(200).json({result:uniqueNPC})
    } catch (e) {
        console.log(e)
    }
}

export const insertNPC = async(req, res) => {
    try{
        const NPCData = req.body
        const newNPC = await NPC.create({
            data:NPCData
        })

        res.status(200).json({result:newNPC})
    } catch (e) {
        console.log(e)
    }
}

export const updateNPC = async(req, res) => {
    try{
        const NPCData = req.body
        const NPCId = parseInt(req.params.id)

        // Attempt to find the user first
        const existingNPC = await NPC.findUnique({
            where: {
                id: NPCId,
            },
        });

        if (!existingNPC) {
            // If the user doesn't exist, return a 404 response
            return res.status(404).json({ error: "NPC not found" });
        }

        const newNPC = await NPC.update({
            where:{
                id:NPCId
            },
            data:NPCData
        })

        res.status(200).json({result:newNPC})
    } catch (e) {
        console.log(e)
    }
}

export const deleteNPC = async(req, res) => {
    try{
        const NPCId = parseInt(req.params.id)

        // Attempt to find the user first
        const existingNPC = await NPC.findUnique({
            where: {
                id: NPCId,
            },
        });

        if (!existingNPC) {
            // If the user doesn't exist, return a 404 response
            return res.status(404).json({ error: "NPC not found" });
        }

        const newNPC = await NPC.delete({
            where:{
                id:NPCId
            },
        })

        res.status(200).json({result:newNPC})
    } catch (e) {
        console.log(e)
    }
}