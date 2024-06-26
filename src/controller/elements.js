const { PrismaClient } = require("@prisma/client");

const Elements = new PrismaClient().elements

const getAllElements = async (req, res) => {
    try{
        const allElements = await Elements.findMany()

        res.status(200).json({result:allElements})
    } catch (e) {
        console.log(e)
    }
}

const getElementById = async (req, res) => {
    try{
        const elementId = parseInt(req.params.id)
        const uniqueElement = await Elements.findUnique({
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

const insertElement = async(req, res) => {
    try{
        const elementData = req.body
        const newElement = await Elements.create({
            data:elementData
        })

        res.status(200).json({result:newElement})
    } catch (e) {
        console.log(e)
    }
}

const updateElement = async(req, res) => {
    try{
        const elementData = req.body
        const elementId = parseInt(req.params.id)

        // Attempt to find the user first
        const existingElement = await Elements.findUnique({
            where: {
                id: elementId,
            },
        });

        if (!existingElement) {
            // If the user doesn't exist, return a 404 response
            return res.status(404).json({ error: "Element not found" });
        }

        const editedElement = await Elements.update({
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

const deleteElement = async(req, res) => {
    try{
        const elementId = parseInt(req.params.id)

        // Attempt to find the user first
        const existingElement = await Elements.findUnique({
            where: {
                id: elementId,
            },
        });

        if (!existingElement) {
            // If the user doesn't exist, return a 404 response
            return res.status(404).json({ error: "Element not found" });
        }
    
        const deletedElement = await Elements.delete({
            where:{
                id:elementId
            },
        })

        res.status(200).json({result:deletedElement})
    } catch (e) {
        console.log(e)
    }
}

module.exports ={
    getAllElements: getAllElements,
    getElementById: getElementById,
    insertElement: insertElement,
    updateElement: updateElement,
    deleteElement: deleteElement
}