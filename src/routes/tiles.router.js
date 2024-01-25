import { Router } from "express";
import { getAllTiles,
        getTileById,
        insertTile,
        updateTile,
        deleteTile } from "../controller/tiles.js";

const tileRouter = Router()

tileRouter.get('/', getAllTiles)
tileRouter.get('/:id', getTileById)
tileRouter.post('/', insertTile)
tileRouter.put('/:id', updateTile)
tileRouter.delete('/:id', deleteTile)

export default tileRouter
