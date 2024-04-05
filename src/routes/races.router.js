const { Router } = require("express");
const { getAllRaces,
        getRaceById,
        insertRace,
        updateRace,
        deleteRace } = require ("../controller/races.js");

const raceRouter = Router()

raceRouter.get('/', getAllRaces)
raceRouter.get('/:id', getRaceById)
raceRouter.post('/', insertRace)
raceRouter.put('/:id', updateRace)
raceRouter.delete('/:id', deleteRace)

module.exports =  raceRouter
