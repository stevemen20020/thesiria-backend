import { PrismaClient } from "@prisma/client"

const Tiles = new PrismaClient().tiles

export const getAllElements = async (req, res) => {
    try{
        const allElements = await Tiles.findMany()

        res.status(200).json({result:allElements})
    } catch (e) {
        console.log(e)
    }
}

export const getElementById = async (req, res) => {
    try{
        const elementId = parseInt(req.params.id)
        const uniqueElement = await Tiles.findUnique({
            where:{
                id:elementId
            }
        })

        if(uniqueElement === null) res.status(404).json({error:'Element not found'})

        res.status(200).json({result:uniqueElement})
    } catch (e) {
        console.log(e)
    }
}

export const insertElement = async(req, res) => {
    try{
        const elementData = req.body
        const newElement = await Tiles.create({
            data:elementData
        })

        res.status(200).json({result:newElement})
    } catch (e) {
        console.log(e)
    }
}

export const updateElement = async(req, res) => {
    try{
        const elementData = req.body
        const elementId = parseInt(req.params.id)

        // Attempt to find the user first
        const existingElement = await Tiles.findUnique({
            where: {
                id: elementId,
            },
        });

        if (!existingElement) {
            // If the user doesn't exist, return a 404 response
            return res.status(404).json({ error: "Element not found" });
        }

        const editedElement = await Tiles.update({
            where:{
                id:elementId
            },
            data:elementData
        })

        res.status(200).json({result:editedElement})
    } catch (e) {
        console.log(e)
    }
}

export const deleteElement = async(req, res) => {
    try{
        const elementId = parseInt(req.params.id)

        // Attempt to find the user first
        const existingElement = await Tiles.findUnique({
            where: {
                id: elementId,
            },
        });

        if (!existingElement) {
            // If the user doesn't exist, return a 404 response
            return res.status(404).json({ error: "Element not found" });
        }
    
        const deletedElement = await Tiles.delete({
            where:{
                id:elementId
            },
        })

        res.status(200).json({result:deletedElement})
    } catch (e) {
        console.log(e)
    }
}