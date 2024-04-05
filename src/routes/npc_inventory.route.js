const { Router } = require("express");
const {getNpcInventory,
        getNpcInventoryById,
        insertNpcInventory,
        updateNpcInventory,
        deleteNpcInventory} = require ("../controller/npc_inventory.js");

const npcInventoryRouter = Router()

npcInventoryRouter.get('/', getNpcInventory)
npcInventoryRouter.get('/:id', getNpcInventoryById)
npcInventoryRouter.post('/', insertNpcInventory)
npcInventoryRouter.put('/:id', updateNpcInventory)
npcInventoryRouter.delete('/:id', deleteNpcInventory)

module.exports =  npcInventoryRouter
