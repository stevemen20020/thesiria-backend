const { PrismaClient } = require("@prisma/client");

const Hakis = new PrismaClient().haki_types

const getAllHakis = async (req, res) => {
    try{
        const allHakis = await Hakis.findMany({
            include: {
                skill_usage:true
            }
        })

        res.status(200).json({result:allHakis})
    } catch (e) {
        console.log(e)
    }
}

const getHakiById = async (req, res) => {
    try{
        const HakiId = parseInt(req.params.id)
        const uniqueHaki = await Hakis.findUnique({
            include: {
                skill_usage:true
            },
            where:{
                id:HakiId
            }
        })

        if(uniqueHaki === null) res.status(404).json({error:'Haki not found'})

        res.status(200).json({result:uniqueHaki})
    } catch (e) {
        console.log(e)
    }
}

const insertHaki = async(req, res) => {
    try{
        const HakiData = req.body
        const newHaki = await Hakis.create({
            data:HakiData
        })

        res.status(200).json({result:newHaki})
    } catch (e) {
        console.log(e)
    }
}

const updateHaki = async(req, res) => {
    try{
        const HakiData = req.body
        const HakiId = parseInt(req.params.id)

        // Attempt to find the user first
        const existingHaki = await Hakis.findUnique({
            where: {
                id: HakiId,
            },
        });

        if (!existingHaki) {
            // If the user doesn't exist, return a 404 response
            return res.status(404).json({ error: "Haki not found" });
        }

        const editedHaki = await Hakis.update({
            where:{
                id:HakiId
            },
            data:HakiData
        })

        res.status(200).json({result:editedHaki})
    } catch (e) {
        console.log(e)
    }
}

const deleteHaki = async(req, res) => {
    try{
        const HakiId = parseInt(req.params.id)

        // Attempt to find the user first
        const existingHaki = await Hakis.findUnique({
            where: {
                id: HakiId,
            },
        });

        if (!existingHaki) {
            // If the user doesn't exist, return a 404 response
            return res.status(404).json({ error: "Haki not found" });
        }
    
        const deletedHaki = await Hakis.delete({
            where:{
                id:HakiId
            },
        })

        res.status(200).json({result:deletedHaki})
    } catch (e) {
        console.log(e)
    }
}

module.exports ={
    getAllHakis: getAllHakis,
    getHakiById: getHakiById,
    insertHaki: insertHaki,
    updateHaki: updateHaki,
    deleteHaki: deleteHaki
}