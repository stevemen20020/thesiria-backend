const { PrismaClient } = require("@prisma/client");

const Spells = new PrismaClient().spells

const getAllSpells = async (req, res) => {
    try{
        const allSpells = await Spells.findMany({
            include: {
                inventory_magic:true,
                effects:true
            }
        })

        res.status(200).json({result:allSpells})
    } catch (e) {
        console.log(e)
    }
}

const getSpellsById = async (req, res) => {
    try{
        const spellsId = parseInt(req.params.id)
        const uniqueSpells = await Spells.findUnique({
            include: {
                include: {
                    inventory_magic:true,
                    effects:true
                }
            },
            where:{
                id:spellsId
            }
        })

        if(uniqueSpells === null) res.status(404).json({error:'Spell not found'})

        res.status(200).json({result:uniqueSpells})
    } catch (e) {
        console.log(e)
    }
}

const insertSpells = async(req, res) => {
    try{
        const spellsData = req.body
        const newSpells = await Spells.create({
            data:spellsData
        })

        res.status(200).json({result:newSpells})
    } catch (e) {
        console.log(e)
    }
}

const updateSpells = async(req, res) => {
    try{
        const spells = req.body
        const spellsId = parseInt(req.params.id)

        // Attempt to find the user first
        const existingSpells = await Spells.findUnique({
            where: {
                id: spellsId,
            },
        });

        if (!existingSpells) {
            // If the user doesn't exist, return a 404 response
            return res.status(404).json({ error: "Spell not found" });
        }

        const editedSpells = await Spells.update({
            where:{
                id:spellsId
            },
            data:spellsData
        })

        res.status(200).json({result:editedSpells})
    } catch (e) {
        console.log(e)
    }
}

const deleteSpells = async(req, res) => {
    try{
        const spellsId = parseInt(req.params.id)

        // Attempt to find the user first
        const existingSpells = await Spells.findUnique({
            where: {
                id: spellsId,
            },
        });

        if (!existingSpells) {
            // If the user doesn't exist, return a 404 response
            return res.status(404).json({ error: "Spell not found" });
        }

        const deletedSpells = await Spells.delete({
            where:{
                id:spellsId
            },
        })

        res.status(200).json({result:deletedSpells})
    } catch (e) {
        console.log(e)
    }
}

module.exports ={
    getAllSpells: getAllSpells,
    getSpellsById: getSpellsById,
    insertSpells: insertSpells,
    updateSpells: updateSpells,
    deleteSpells: deleteSpells
}