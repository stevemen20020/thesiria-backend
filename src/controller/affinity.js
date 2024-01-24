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
        const affinityId = parseInt(req.params.id)
        const uniqueAffinity = await Affinity.findUnique({
            where:{
                id:affinityId
            },
            include: {
                elements:true
            }
        })

        res.status(200).json({result:uniqueAffinity})
    } catch (e) {
        console.log(e)
    }
}

export const insertAffinity = async(req, res) => {
    try{
        const affinityData = req.body
        const newAffinity = await Affinity.create({
            data:affinityData
        })

        res.status(200).json({result:newAffinity})
    } catch (e) {
        console.log(e)
    }
}

export const updateAffinity = async(req, res) => {
    try{
        const affinityData = req.body
        const affinityId = parseInt(req.params.id)
        const editedAffinity = await Affinity.update({
            where:{
                id:affinityId
            },
            data:affinityData
        })

        res.status(200).json({result:editedAffinity})
    } catch (e) {
        console.log(e)
    }
}

export const deleteAffinity = async(req, res) => {
    try{
        const affinityId = parseInt(req.params.id)
        const deletedAffinity = await Affinity.delete({
            where:{
                id:affinityId
            },
        })

        res.status(200).json({result:deletedAffinity})
    } catch (e) {
        console.log(e)
    }
}