import { Router } from "express";
import {
        getMissionFases,
        getMissionFasesById,
        insertMissionFases,
        updateMissionFases,
        deleteMissionFases

        }from "../controller/mission_fases.js"

const missionFasesRouter = Router()

missionFasesRouter.get('/', getAllmissionFases)
missionFasesRouter.get('/:id', getmissionFasesById)
missionFasesRouter.post('/', insertmissionFases)
missionFasesRouter.put('/:id', updatemissionFases)
missionFasesRouter.delete('/:id', deletemissionFases)

export default missionFasesRouter
