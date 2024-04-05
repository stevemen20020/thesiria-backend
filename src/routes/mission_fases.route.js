const { Router } = require("express");
const {
        getMissionFases,
        getMissionFasesById,
        insertMissionFases,
        updateMissionFases,
        deleteMissionFases

        } = require ("../controller/mission_fases.js");

const missionFasesRouter = Router()

missionFasesRouter.get('/', getMissionFases)
missionFasesRouter.get('/:id', getMissionFasesById)
missionFasesRouter.post('/', insertMissionFases)
missionFasesRouter.put('/:id', updateMissionFases)
missionFasesRouter.delete('/:id', deleteMissionFases)

module.exports =  missionFasesRouter
