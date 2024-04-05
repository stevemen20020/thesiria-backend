const { PrismaClient } = require("@prisma/client");

const Affinity = new PrismaClient().affinity

const getAllAffinity = async (req, res) => {
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

const getAffinityById = async (req, res) => {
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

        if(uniqueAffinity === null) res.status(404).json({error:'Affinity not found'})

        res.status(200).json({result:uniqueAffinity})
    } catch (e) {
        console.log(e)
    }
}

const insertAffinity = async(req, res) => {
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

const updateAffinity = async(req, res) => {
    try{
        const affinityData = req.body
        const affinityId = parseInt(req.params.id)

        // Attempt to find the user first
        const existingAffinity = await Affinity.findUnique({
            where: {
                id: affinityId,
            },
        });

        if (!existingAffinity) {
            // If the user doesn't exist, return a 404 response
            return res.status(404).json({ error: "Affinity not found" });
        }

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

const deleteAffinity = async(req, res) => {
    try{
        const affinityId = parseInt(req.params.id)

        // Attempt to find the user first
        const existingAffinity = await Affinity.findUnique({
            where: {
                id: affinityId,
            },
        });

        if (!existingAffinity) {
            // If the user doesn't exist, return a 404 response
            return res.status(404).json({ error: "Affinity not found" });
        }

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

module.exports ={
    getAllAffinity: getAllAffinity,
    getAffinityById: getAffinityById,
    insertAffinity: insertAffinity,
    updateAffinity: updateAffinity,
    deleteAffinity: deleteAffinity
}