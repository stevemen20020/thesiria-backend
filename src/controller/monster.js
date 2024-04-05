const { PrismaClient } = require("@prisma/client");

const Monster = new PrismaClient().monster

const getAllMonster = async (req, res) => {
    try{
        const allMonster = await Monster.findMany({
            include: {
                armor:true,
                weapon:true
            }
        })

        res.status(200).json({result:allMonster})
    } catch (e) {
        console.log(e)
    }
}

const getMonsterById = async (req, res) => {
    try{
        const MonsterId = parseInt(req.params.id)
        const uniqueMonster = await Monster.findUnique({
            include: {
                skill_usage:true
            },
            where:{
                armor:true,
                weapon:true
            }
        })

        if(uniqueMonster === null) res.status(404).json({error:'Monster not found'})

        res.status(200).json({result:uniqueMonster})
    } catch (e) {
        console.log(e)
    }
}

const insertMonster = async(req, res) => {
    try{
        const MonsterData = req.body
        const newMonster = await Monster.create({
            data:MonsterData
        })

        res.status(200).json({result:newMonster})
    } catch (e) {
        console.log(e)
    }
}

const updateMonster = async(req, res) => {
    try{
        const MonsterData = req.body
        const MonsterId = parseInt(req.params.id)

        // Attempt to find the user first
        const existingMonster = await Monster.findUnique({
            where: {
                id: MonsterId,
            },
        });

        if (!existingMonster) {
            // If the user doesn't exist, return a 404 response
            return res.status(404).json({ error: "Monster not found" });
        }

        const editedMonster = await Monster.update({
            where:{
                id:MonsterId
            },
            data:MonsterData
        })

        res.status(200).json({result:editedMonster})
    } catch (e) {
        console.log(e)
    }
}

const deleteMonster = async(req, res) => {
    try{
        const MonsterId = parseInt(req.params.id)

        // Attempt to find the user first
        const existingMonster = await Monster.findUnique({
            where: {
                id: MonsterId,
            },
        });

        if (!existingMonster) {
            // If the user doesn't exist, return a 404 response
            return res.status(404).json({ error: "Monster not found" });
        }
    
        const deletedMonster = await Monster.delete({
            where:{
                id:MonsterId
            },
        })

        res.status(200).json({result:deletedMonster})
    } catch (e) {
        console.log(e)
    }
}

module.exports ={
    getAllMonster: getAllMonster,
    getMonsterById: getMonsterById,
    insertMonster: insertMonster,
    updateMonster: updateMonster,
    deleteMonster: deleteMonster
}