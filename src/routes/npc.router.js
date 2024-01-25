import { Router } from "express";
import { getAllNPCs,
        getNPCById,
        insertNPC,
        updateNPC,
        deleteNPC } from "../controller/npc.js";

const npcRouter = Router()

npcRouter.get('/', getAllNPCs)
npcRouter.get('/:id', getNPCById)
npcRouter.post('/', insertNPC)
npcRouter.put('/:id', updateNPC)
npcRouter.delete('/:id', deleteNPC)

export default npcRouter
