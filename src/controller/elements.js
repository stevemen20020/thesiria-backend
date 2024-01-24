import { PrismaClient } from "@prisma/client"

const Elements = new PrismaClient().elements

export const getAllElements = async (req, res) => {
    try{
        const allElements = await Elements.findMany()

        res.status(200).json({result:allElements})
    } catch (e) {
        console.log(e)
    }
}

export const getElementById = async (req, res) => {
    try{
        const elementId = parseInt(req.params.id)
        const uniqueElement = await Elements.findUnique({
            where:{
                id:elementId
            }
        })

        res.status(200).json({result:uniqueElement})
    } catch (e) {
        console.log(e)
    }
}

export const insertElement = async(req, res) => {
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

export const updateElement = async(req, res) => {
    try{
        const elementData = req.body
        const elementId = parseInt(req.params.id)
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

export const deleteElement = async(req, res) => {
    try{
        const elementId = parseInt(req.params.id)
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