const { Router } = require("express");
const { getInventoryMagic,
        getInventoryMagicById,
        insertInventoryMagic,
        updateInventoryMagic,
        deleteInventoryMagic } = require ("../controller/inventory_magic.js");

const inventoryMagicRouter = Router()

inventoryMagicRouter.get('/', getInventoryMagic)
inventoryMagicRouter.get('/:id', getInventoryMagicById)
inventoryMagicRouter.post('/', insertInventoryMagic)
inventoryMagicRouter.put('/:id', updateInventoryMagic)
inventoryMagicRouter.delete('/:id', deleteInventoryMagic)

module.exports =  inventoryMagicRouter
