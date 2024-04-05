const { PrismaClient } = require("@prisma/client");

const SpellBuffDebuff = new PrismaClient().spell_buff_debuff

const getAllSpellBuffDebuff = async (req, res) => {
    try{
        const allSpellBuffDebuff = await SpellBuffDebuff.findMany({
            include: {
                skill_usage:true,
                spells:true
            }
        })

        res.status(200).json({result:allSpellBuffDebuff})
    } catch (e) {
        console.log(e)
    }
}

const getSpellBuffDebuffById = async (req, res) => {
    try{
        const spellBuffDebuffId = parseInt(req.params.id)
        const uniqueSpellBuffDebuff = await SpellBuffDebuff.findUnique({
            include: {
                include: {
                    skill_usage:true,
                    spells:true
                }
            },
            where:{
                id:spellBuffDebuffId
            }
        })

        if(uniqueSpellBuffDebuff === null) res.status(404).json({error:'Spell Buff not found'})

        res.status(200).json({result:uniqueSpellBuffDebuff})
    } catch (e) {
        console.log(e)
    }
}

const insertSpellBuffDebuff = async(req, res) => {
    try{
        const spellBuffDebuffData = req.body
        const newSpellBuffDebuff = await SpellBuffDebuff.create({
            data:spellBuffDebuffData
        })

        res.status(200).json({result:newSpellBuffDebuff})
    } catch (e) {
        console.log(e)
    }
}

const updateSpellBuffDebuff = async(req, res) => {
    try{
        const spellBuffDebuffData = req.body
        const spellBuffDebuffId = parseInt(req.params.id)

        // Attempt to find the user first
        const existingSpellBuffDebuff = await SpellBuffDebuff.findUnique({
            where: {
                id: spellBuffDebuffId,
            },
        });

        if (!existingSpellBuffDebuff) {
            // If the user doesn't exist, return a 404 response
            return res.status(404).json({ error: "Spell Buff not found" });
        }

        const editedSpellBuffDebuff = await SpellBuffDebuff.update({
            where:{
                id:spellBuffDebuffId
            },
            data:spellBuffDebuffData
        })

        res.status(200).json({result:editedSpellBuffDebuff})
    } catch (e) {
        console.log(e)
    }
}

const deleteSpellBuffDebuff = async(req, res) => {
    try{
        const spellBuffDebuffId = parseInt(req.params.id)

        // Attempt to find the user first
        const existingSpellBuffDebuff = await SpellBuffDebuff.findUnique({
            where: {
                id: spellBuffDebuffId,
            },
        });

        if (!existingSpellBuffDebuff) {
            // If the user doesn't exist, return a 404 response
            return res.status(404).json({ error: "Spell Buff not found" });
        }

        const deletedSpellBuffDebuff = await SpellBuffDebuff.delete({
            where:{
                id:spellBuffDebuffId
            },
        })

        res.status(200).json({result:deletedSpellBuffDebuff})
    } catch (e) {
        console.log(e)
    }
}

module.exports ={
    getAllSpellBuffDebuff: getAllSpellBuffDebuff,
    getSpellBuffDebuffById: getSpellBuffDebuffById,
    insertSpellBuffDebuff: insertSpellBuffDebuff,
    updateSpellBuffDebuff: updateSpellBuffDebuff,
    deleteSpellBuffDebuff: deleteSpellBuffDebuff
}