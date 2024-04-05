const { Router } = require("express");
const { getAllNPCs,
        getNPCById,
        insertNPC,
        updateNPC,
        deleteNPC } = require ("../controller/npc.js");

const npcRouter = Router()

npcRouter.get('/', getAllNPCs)
npcRouter.get('/:id', getNPCById)
npcRouter.post('/', insertNPC)
npcRouter.put('/:id', updateNPC)
npcRouter.delete('/:id', deleteNPC)

module.exports =  npcRouter
