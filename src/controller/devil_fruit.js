const { PrismaClient } = require("@prisma/client");

const DevilFruit = new PrismaClient().devil_fruit

const getAllDevilFruits = async (req, res) => {
    try{
        const allDevilFruits = await DevilFruit.findMany({
            include: {
                skill_usage:true
            }
        })

        res.status(200).json({result:allDevilFruits})
    } catch (e) {
        console.log(e)
    }
}

const getDevilFruitById = async (req, res) => {
    try{
        const devilFruitId = parseInt(req.params.id)
        const uniqueDevilFruit = await DevilFruit.findUnique({
            include: {
                skill_usage:true
            },
            where:{
                id:devilFruitId
            }
        })

        if(uniqueDevilFruit === null) res.status(404).json({error:'Devil Fruit not found'})

        res.status(200).json({result:uniqueDevilFruit})
    } catch (e) {
        console.log(e)
    }
}

const insertDevilFruit = async(req, res) => {
    try{
        const devilFruitData = req.body
        const newDevilFruit = await DevilFruit.create({
            data:devilFruitData
        })

        res.status(200).json({result:newDevilFruit})
    } catch (e) {
        console.log(e)
    }
}

const updateDevilFruit = async(req, res) => {
    try{
        const devilFruitData = req.body
        const devilFruitId = parseInt(req.params.id)

        // Attempt to find the user first
        const existingDevilFruit = await DevilFruit.findUnique({
            where: {
                id: devilFruitId,
            },
        });

        if (!existingDevilFruit) {
            // If the user doesn't exist, return a 404 response
            return res.status(404).json({ error: "Devil Fruit not found" });
        }

        const editedDevilFruit = await DevilFruit.update({
            where:{
                id:devilFruitId
            },
            data:devilFruitData
        })

        res.status(200).json({result:editedDevilFruit})
    } catch (e) {
        console.log(e)
    }
}

const deleteDevilFruit = async(req, res) => {
    try{
        const devilFruitId = parseInt(req.params.id)

        // Attempt to find the user first
        const existingDevilFruit = await DevilFruit.findUnique({
            where: {
                id: devilFruitId,
            },
        });

        if (!existingDevilFruit) {
            // If the user doesn't exist, return a 404 response
            return res.status(404).json({ error: "DevilFruit not found" });
        }

        const deletedDevilFruit = await DevilFruit.delete({
            where:{
                id:devilFruitId
            },
        })

        res.status(200).json({result:deletedDevilFruit})
    } catch (e) {
        console.log(e)
    }
}

module.exports ={
    getAllDevilFruits: getAllDevilFruits,
    getDevilFruitById: getDevilFruitById,
    insertDevilFruit: insertDevilFruit,
    updateDevilFruit: updateDevilFruit,
    deleteDevilFruit: deleteDevilFruit
}