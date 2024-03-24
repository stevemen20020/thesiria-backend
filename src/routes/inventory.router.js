import { Router } from "express";
import { getInventory,
        getInventoryById,
        insertInventory,
        updateInventory,
        deleteInventory } from "../controller/inventory.js";

const inventoryRouter = Router()

inventoryRouter.get('/', getInventory)
inventoryRouter.get('/:id', getInventoryById)
inventoryRouter.post('/', insertInventory)
inventoryRouter.put('/:id', updateInventory)
inventoryRouter.delete('/:id', deleteInventory)

export default inventoryRouter
