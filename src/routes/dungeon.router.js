import { Router } from "express";
import { getAllDungeons,
         getDungeonById,
         insertDungeon,
         updateDungeon,
         deleteDungeon } from "../controller/dungeons.js";

const dungeonRouter = Router()

dungeonRouter.get('/', getAllDungeons)
dungeonRouter.get('/:id', getDungeonById)
dungeonRouter.post('/', insertDungeon)
dungeonRouter.put('/:id', updateDungeon)
dungeonRouter.delete('/:id', deleteDungeon)

export default dungeonRouter
