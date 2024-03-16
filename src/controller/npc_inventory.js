import { PrismaClient } from "@prisma/client"

const Npc_Inventory = new PrismaClient().npc_inventory

export const getNpcInventory = async (req, res) => {
    try{
        const allNpcInventory = await Npc_Inventory.findMany({
            include: {
                npc:true,
                objects:true
            }
        })
        res.status(200).json({result:allNpcInventory})
    } catch (e) {
        console.log(e)
    }
}

export const getNpcInventoryById = async (req, res) => {
    try{
        const npcInventoryId = parseInt(req.params.id)
        const uniqueNpcInventory = await Npc_Inventory.findUnique({
            where:{
                id:npcInventoryId
            },
            include: {
                npc:true,
                objects:true
            }
        })

        if(uniqueNpcInventory === null) res.status(404).json({error:'Inventory not found'})

        res.status(200).json({result:uniqueNpcInventory})
    } catch (e) {
        console.log(e)
    }
}

export const insertNpcInventory = async(req, res) => {
    try{
        const npcInventoryData = req.body
        const newNpcInventory = await Npc_Inventory.create({
            data:npcInventoryData
        })

        res.status(200).json({result:newNpcInventory})
    } catch (e) {
        console.log(e)
    }
}

export const updateNpcInventory = async(req, res) => {
    try{
        const npcInventoryData = req.body
        const npcInventoryId = parseInt(req.params.id)

        // Attempt to find the user first
        const existingNpcInventory = await Npc_Inventory.findUnique({
            where: {
                id: npcInventoryId,
            },
        });

        if (!existingNpcInventory) {
            // If the user doesn't exist, return a 404 response
            return res.status(404).json({ error: "Inventory not found" });
        }

        const editedNpcInventoryId = await Npc_Inventory.update({
            where:{
                id:npcInventoryId
            },
            data:npcInventoryData
        })

        res.status(200).json({result:editedNpcInventoryId})
    } catch (e) {
        console.log(e)
    }
}

export const deleteNpcInventory = async(req, res) => {
    try{
        const npcInventorylId = parseInt(req.params.id)

        // Attempt to find the user first
        const existingNpcInventory = await Npc_Inventory.findUnique({
            where: {
                id: npcInventoryId,
            },
        });

        if (!existingNpcInventory) {
            // If the user doesn't exist, return a 404 response
            return res.status(404).json({ error: "Journal not found" });
        }

        const deletedNpcInventory = await Npc_Inventory.delete({
            where:{
                id:npcInventoryId
            },
        })

        res.status(200).json({result:deletedNpcInventory})
    } catch (e) {
        console.log(e)
    }
}