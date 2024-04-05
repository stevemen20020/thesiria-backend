const { PrismaClient } = require("@prisma/client");

const Tiles = new PrismaClient().tiles

const getAllTiles = async (req, res) => {
    try{
        const allTiles = await Tiles.findMany({
            include:{
                dungeons_dungeons_location_idTotiles:true,
                city_city_location_idTotiles:true
            }
        })

        res.status(200).json({result:allTiles})
    } catch (e) {
        console.log(e)
    }
}

const getTileById = async (req, res) => {
    try{
        const tileId = parseInt(req.params.id)
        const uniqueTile = await Tiles.findUnique({
            where:{
                id:tileId
            },
            include:{
                dungeons_dungeons_location_idTotiles:true,
                city_city_location_idTotiles:true
            }
        })

        if(uniqueTile === null) res.status(404).json({error:'Tile not found'})

        res.status(200).json({result:uniqueTile})
    } catch (e) {
        console.log(e)
    }
}

const insertTile = async(req, res) => {
    try{
        const tileData = req.body
        const newTile = await Tiles.create({
            data:tileData
        })

        res.status(200).json({result:newTile})
    } catch (e) {
        console.log(e)
    }
}

const updateTile = async(req, res) => {
    try{
        const tileData = req.body
        const tileId = parseInt(req.params.id)

        // Attempt to find the user first
        const existingTile = await Tiles.findUnique({
            where: {
                id: tileId,
            },
        });

        if (!existingTile) {
            // If the user doesn't exist, return a 404 response
            return res.status(404).json({ error: "Tile not found" });
        }

        const editedTile = await Tiles.update({
            where:{
                id:tileId
            },
            data:tileData
        })

        res.status(200).json({result:editedTile})
    } catch (e) {
        console.log(e)
    }
}

const deleteTile = async(req, res) => {
    try{
        const tileId = parseInt(req.params.id)

        // Attempt to find the user first
        const existingTile = await Tiles.findUnique({
            where: {
                id: tileId,
            },
        });

        if (!existingTile) {
            // If the user doesn't exist, return a 404 response
            return res.status(404).json({ error: "Tile not found" });
        }
    
        const deletedTile = await Tiles.delete({
            where:{
                id:tileId
            },
        })

        res.status(200).json({result:deletedTile})
    } catch (e) {
        console.log(e)
    }
}

module.exports ={
    getAllTiles: getAllTiles,
    getTileById: getTileById,
    insertTile: insertTile,
    updateTile: updateTile,
    deleteTile: deleteTile
}