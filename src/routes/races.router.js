import { Router } from "express";
import { getAllRaces,
        getRaceById,
        insertRace,
        updateRace,
        deleteRace } from "../controller/races.js";

const raceRouter = Router()

raceRouter.get('/', getAllRaces)
raceRouter.get('/:id', getRaceById)
raceRouter.post('/', insertRace)
raceRouter.put('/:id', updateRace)
raceRouter.delete('/:id', deleteRace)

export default raceRouter
