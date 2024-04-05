const { PrismaClient } = require("@prisma/client");

const Attack = new PrismaClient().attacks

const getAllAttacks = async (req, res) => {
    try{
        const allAttacks = await Attack.findMany({
            include: {
                playable_character:true,
                npc:true,
                skill_usage_attacks_skill_usageToskill_usage:true
            }
        })

        res.status(200).json({result:allAttacks})
    } catch (e) {
        console.log(e)
    }
}

const getAttackById = async (req, res) => {
    try{
        const attackId = parseInt(req.params.id)
        const uniqueAttack = await Attack.findUnique({
            include: {
                playable_character:true,
                npc:true,
                skill_usage_attacks_skill_usageToskill_usage:true
            },
            where:{
                id:attackId
            }
        })

        if(uniqueAttack === null) res.status(404).json({error:'Attack not found'})

        res.status(200).json({result:uniqueAttack})
    } catch (e) {
        console.log(e)
    }
}

const insertAttack = async(req, res) => {
    try{
        const attackData = req.body
        const newAttack = await Attack.create({
            data:attackData
        })

        res.status(200).json({result:newAttack})
    } catch (e) {
        console.log(e)
    }
}

const updateAttack = async(req, res) => {
    try{
        const attackData = req.body
        const attackId = parseInt(req.params.id)

        // Attempt to find the user first
        const existingAttack = await Attack.findUnique({
            where: {
                id: attackId,
            },
        });

        if (!existingAttack) {
            // If the user doesn't exist, return a 404 response
            return res.status(404).json({ error: "Attack not found" });
        }

        const editedAttack = await Attack.update({
            where:{
                id:attackId
            },
            data:attackData
        })

        res.status(200).json({result:editedAttack})
    } catch (e) {
        console.log(e)
    }
}

const deleteAttack = async(req, res) => {
    try{
        const attackId = parseInt(req.params.id)

        // Attempt to find the user first
        const existingAttack = await Attack.findUnique({
            where: {
                id: attackId,
            },
        });

        if (!existingAttack) {
            // If the user doesn't exist, return a 404 response
            return res.status(404).json({ error: "Attack not found" });
        }

        const deletedAttack = await Attack.delete({
            where:{
                id:attackId
            },
        })

        res.status(200).json({result:deletedAttack})
    } catch (e) {
        console.log(e)
    }
}

module.exports ={
    getAllAttacks: getAllAttacks,
    getAttackById: getAttackById,
    insertAttack: insertAttack,
    updateAttack: updateAttack,
    deleteAttack: deleteAttack
}