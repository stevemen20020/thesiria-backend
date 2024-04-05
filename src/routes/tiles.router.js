const { Router } = require("express");
const { getAllTiles,
        getTileById,
        insertTile,
        updateTile,
        deleteTile } = require ("../controller/tiles.js");

const tileRouter = Router()

tileRouter.get('/', getAllTiles)
tileRouter.get('/:id', getTileById)
tileRouter.post('/', insertTile)
tileRouter.put('/:id', updateTile)
tileRouter.delete('/:id', deleteTile)

module.exports =  tileRouter
