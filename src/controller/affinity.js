import { PrismaClient } from "@prisma/client"

const Affinity = new PrismaClient().affinity

export const getAllAffinity = async (req, res) => {
    try{
        const allAffinity = await Affinity.findMany({
            include: {
                elements:true
            }
        })
        res.status(200).json({result:allAffinity})
    } catch (e) {
        console.log(e)
    }
}

export const getAffinityById = async (req, res) => {
    try{
        const elementId = parseInt(req.params.id)
        const uniqueElement = await Affinity.findUnique({
            where:{
                id:elementId
            }
        })

        res.status(200).json({result:uniqueElement})
    } catch (e) {
        console.log(e)
    }
}

export const insertAffinity = async(req, res) => {
    try{
        const elementData = req.body
        const newElement = await Affinity.create({
            data:elementData
        })

        res.status(200).json({result:newElement})
    } catch (e) {
        console.log(e)
    }
}

export const updateAffinity = async(req, res) => {
    try{
        const elementData = req.body
        const elementId = parseInt(req.params.id)
        const editedElement = await Affinity.update({
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

export const deleteAffinity = async(req, res) => {
    try{
        const elementId = parseInt(req.params.id)
        const deletedElement = await Affinity.delete({
            where:{
                id:elementId
            },
        })

        res.status(200).json({result:deletedElement})
    } catch (e) {
        console.log(e)
    }
}