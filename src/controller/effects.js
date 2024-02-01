import { PrismaClient } from "@prisma/client"

const Effect = new PrismaClient().effects

export const getAllEffects = async (req, res) => {
    try{
        const allEffects = await Effect.findMany()

        res.status(200).json({result:allEffects})
    } catch (e) {
        console.log(e)
    }
}

export const getEffectById = async (req, res) => {
    try{
        const effectId = parseInt(req.params.id)
        const uniqueEffect = await Effect.findUnique({
            where:{
                id:effectId
            }
        })

        if(uniqueEffect === null) res.status(404).json({error:'Effect not found'})

        res.status(200).json({result:uniqueEffect})
    } catch (e) {
        console.log(e)
    }
}

export const insertEffect = async(req, res) => {
    try{
        const effectData = req.body
        const newEffect = await Effect.create({
            data:effectData
        })

        res.status(200).json({result:newEffect})
    } catch (e) {
        console.log(e)
    }
}

export const updateEffect = async(req, res) => {
    try{
        const effectData = req.body
        const effectId = parseInt(req.params.id)

        // Attempt to find the user first
        const existingEffect = await Effect.findUnique({
            where: {
                id: effectId,
            },
        });

        if (!existingEffect) {
            // If the user doesn't exist, return a 404 response
            return res.status(404).json({ error: "Effect not found" });
        }

        const editedEffect = await Effect.update({
            where:{
                id:effectId
            },
            data:effectData
        })

        res.status(200).json({result:editedEffect})
    } catch (e) {
        console.log(e)
    }
}

export const deleteEffect = async(req, res) => {
    try{
        const effectId = parseInt(req.params.id)

        // Attempt to find the user first
        const existingEffect = await Effect.findUnique({
            where: {
                id: effectId,
            },
        });

        if (!existingEffect) {
            // If the user doesn't exist, return a 404 response
            return res.status(404).json({ error: "Effect not found" });
        }

        const deletedEffect = await Effect.delete({
            where:{
                id:effectId
            },
        })

        res.status(200).json({result:deletedEffect})
    } catch (e) {
        console.log(e)
    }
}