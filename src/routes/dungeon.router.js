const { Router } = require("express");
const { getAllDungeons,
         getDungeonById,
         insertDungeon,
         updateDungeon,
         deleteDungeon } = require ("../controller/dungeons.js");

const dungeonRouter = Router()

dungeonRouter.get('/', getAllDungeons)
dungeonRouter.get('/:id', getDungeonById)
dungeonRouter.post('/', insertDungeon)
dungeonRouter.put('/:id', updateDungeon)
dungeonRouter.delete('/:id', deleteDungeon)

module.exports =  dungeonRouter
