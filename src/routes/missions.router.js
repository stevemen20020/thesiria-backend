import { Router } from "express";
import {getAllMissions,
        getMissionsById,
        insertMissions,
        updateMissions,
        deleteMissions
        } from "../controller/missions.js";

const missionsRouter = Router()

missionsRouter.get('/', getAllMissions)
missionsRouter.get('/:id', getMissionsById)
missionsRouter.post('/', insertMissions)
missionsRouter.put('/:id', updateMissions)
missionsRouter.delete('/:id', deleteMissions)

export default missionsRouter
