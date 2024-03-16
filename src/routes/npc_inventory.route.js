import { Router } from "express";
import {getNpcInventory,
        getNpcInventoryById,
        insertNpcInventory,
        updateNpcInventory,
        deleteNpcInventory} from "../controller/npc_inventory.js"

const npcInventoryRouter = Router()

npcInventoryRouter.get('/', getNpcInventory)
npcInventoryRouter.get('/:id', getNpcInventoryById)
npcInventoryRouter.post('/', insertNpcInventory)
npcInventoryRouter.put('/:id', updateNpcInventory)
npcInventoryRouter.delete('/:id', deleteNpcInventory)

export default npcInventoryRouter
