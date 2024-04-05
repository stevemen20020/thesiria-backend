const { Router } = require("express");
const {getAllMissions,
        getMissionsById,
        insertMissions,
        updateMissions,
        deleteMissions
        } = require ("../controller/missions.js");

const missionsRouter = Router()

missionsRouter.get('/', getAllMissions)
missionsRouter.get('/:id', getMissionsById)
missionsRouter.post('/', insertMissions)
missionsRouter.put('/:id', updateMissions)
missionsRouter.delete('/:id', deleteMissions)

module.exports =  missionsRouter
