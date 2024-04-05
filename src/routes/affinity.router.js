const { Router } = require("express");
const {
        getAllAffinity,
        getAffinityById,
        insertAffinity,
        updateAffinity,
        deleteAffinity
    } = require("../controller/affinity.js");

const affinityRouter = Router()

affinityRouter.get('/', getAllAffinity)
affinityRouter.get('/:id', getAffinityById)
affinityRouter.post('/', insertAffinity)
affinityRouter.put('/:id', updateAffinity)
affinityRouter.delete('/:id', deleteAffinity)

module.exports =  affinityRouter
