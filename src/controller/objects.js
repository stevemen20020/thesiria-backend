import { PrismaClient } from "@prisma/client"

const Objects = new PrismaClient().objects

export const getAllObjects = async (req, res) => {
    try{
        const allObjects = await Objects.findMany({
            include: {
                elements:true,
                skill_usage:true,
                tiles:true
            }
        })
        res.status(200).json({result:allObjects})
    } catch (e) {
        console.log(e)
    }
}

export const getObjectById = async (req, res) => {
    try{
        const objectId = parseInt(req.params.id)
        const uniqueObject = await Objects.findUnique({
            where:{
                id:objectId
            },
            include: {
                elements:true,
                skill_usage:true,
                tiles:true
            }
        })

        if(uniqueObject === null) res.status(404).json({error:'Object not found'})

        res.status(200).json({result:uniqueObject})
    } catch (e) {
        console.log(e)
    }
}

export const insertObject = async(req, res) => {
    try{
        const objectData = req.body
        const newObject = await Objects.create({
            data:objectData
        })

        res.status(200).json({result:newObject})
    } catch (e) {
        console.log(e)
    }
}

export const updateObject = async(req, res) => {
    try{
        const objectData = req.body
        const objectId = parseInt(req.params.id)

        // Attempt to find the user first
        const existingObject = await Objects.findUnique({
            where: {
                id: objectId,
            },
        });

        if (!existingObject) {
            // If the user doesn't exist, return a 404 response
            return res.status(404).json({ error: "Object not found" });
        }

        const editedObject = await Objects.update({
            where:{
                id:objectId
            },
            data:objectData
        })

        res.status(200).json({result:editedObject})
    } catch (e) {
        console.log(e)
    }
}

export const deleteObject = async(req, res) => {
    try{
        const objectId = parseInt(req.params.id)

        // Attempt to find the user first
        const existingObject = await Objects.findUnique({
            where: {
                id: objectId,
            },
        });

        if (!existingObject) {
            // If the user doesn't exist, return a 404 response
            return res.status(404).json({ error: "Object not found" });
        }

        const deletedObject = await Objects.delete({
            where:{
                id:objectId
            },
        })

        res.status(200).json({result:deletedObject})
    } catch (e) {
        console.log(e)
    }
}