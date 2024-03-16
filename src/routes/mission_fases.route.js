import { Router } from "express";
import {
        getMissionFases,
        getMissionFasesById,
        insertMissionFases,
        updateMissionFases,
        deleteMissionFases

        }from "../controller/mission_fases.js"

const missionFasesRouter = Router()

missionFasesRouter.get('/', getMissionFases)
missionFasesRouter.get('/:id', getMissionFasesById)
missionFasesRouter.post('/', insertMissionFases)
missionFasesRouter.put('/:id', updateMissionFases)
missionFasesRouter.delete('/:id', deleteMissionFases)

export default missionFasesRouter
