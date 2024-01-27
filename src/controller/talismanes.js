import { PrismaClient } from "@prisma/client"

const Talismanes = new PrismaClient().talismanes

export const getAllTalismanes = async (req, res) => {
    try{
        const allTalismanes = await Talismanes.findMany()

        res.status(200).json({result:allTalismanes})
    } catch (e) {
        console.log(e)
    }
}

export const getTalismanById = async (req, res) => {
    try{
        const talismanId = parseInt(req.params.id)
        const uniqueTalisman = await Talismanes.findUnique({
            where:{
                id:talismanId
            }
        })

        if(uniqueElement === null) res.status(404).json({error:'Element not found'})

        res.status(200).json({result:uniqueTalisman})
    } catch (e) {
        console.log(e)
    }
}

export const insertTalisman = async(req, res) => {
    try{
        const talismanData = req.body
        const newTalisman = await Talismanes.create({
            data:talismanData
        })

        res.status(200).json({result:newTalisman})
    } catch (e) {
        console.log(e)
    }
}

export const updateTalisman = async(req, res) => {
    try{
        const talismanData = req.body
        const talismanId = parseInt(req.params.id)

        // Attempt to find the user first
        const existingTalisman = await Talismanes.findUnique({
            where: {
                id: talismanId,
            },
        });

        if (!existingTalisman) {
            // If the user doesn't exist, return a 404 response
            return res.status(404).json({ error: "Talisman not found" });
        }

        const editedTalisman = await Talismanes.update({
            where:{
                id:talismanId
            },
            data:talismanData
        })

        res.status(200).json({result:editedTalisman})
    } catch (e) {
        console.log(e)
    }
}

export const deleteTalisman = async(req, res) => {
    try{
        const talismanId = parseInt(req.params.id)

        // Attempt to find the user first
        const existingTalisman = await Talismanes.findUnique({
            where: {
                id: talismanId,
            },
        });

        if (!existingTalisman) {
            // If the user doesn't exist, return a 404 response
            return res.status(404).json({ error: "Talisman not found" });
        }
    
        const deletedTalisman = await Talismanes.delete({
            where:{
                id:talismanId
            },
        })

        res.status(200).json({result:deletedTalisman})
    } catch (e) {
        console.log(e)
    }
}