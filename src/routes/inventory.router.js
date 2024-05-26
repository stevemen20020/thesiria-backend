const { Router } = require("express");
const { getInventory,
        getInventoryById,
        insertInventory,
        updateInventory,
        deleteInventory, 
        updateInventoryForPlayer} = require ("../controller/inventory.js");

const inventoryRouter = Router()

inventoryRouter.get('/', getInventory)
inventoryRouter.get('/:id', getInventoryById)
inventoryRouter.post('/', insertInventory)
inventoryRouter.put('/:id', updateInventory)
inventoryRouter.delete('/:id', deleteInventory)
inventoryRouter.patch('/',updateInventoryForPlayer)

module.exports =  inventoryRouter
