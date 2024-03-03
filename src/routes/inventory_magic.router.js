import { Router } from "express";
import { getInventoryMagic,
        getInventoryMagicById,
        insertInventoryMagic,
        updateInventoryMagic,
        deleteInventoryMagic } from "../controller/inventory_magic.js";

const inventoryMagicRouter = Router()

inventoryMagicRouter.get('/', getInventoryMagic)
inventoryMagicRouter.get('/:id', getInventoryMagicById)
inventoryMagicRouter.post('/', insertInventoryMagic)
inventoryMagicRouter.put('/:id', updateInventoryMagic)
inventoryMagicRouter.delete('/:id', deleteInventoryMagic)

export default inventoryMagicRouter
