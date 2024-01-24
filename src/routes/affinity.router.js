import { Router } from "express";
import { getAllAffinity,
        getAffinityById,
        insertAffinity,
        updateAffinity,
        deleteAffinity } from "../controller/affinity.js";

const affinityRouter = Router()

affinityRouter.get('/', getAllAffinity)
affinityRouter.get('/:id', getAffinityById)
affinityRouter.post('/', insertAffinity)
affinityRouter.put('/:id', updateAffinity)
affinityRouter.delete('/:id', deleteAffinity)

export default affinityRouter
