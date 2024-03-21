import { Router } from "express";
import { getInventory,
        getInventoryById,
        insertInventory,
        updateInventory,
        deleteInventory } from "../controller/inventory.js";

<<<<<<< Updated upstream
const inventoryWeaponRouter = Router()
=======
const inventoryRouter = Router()
>>>>>>> Stashed changes

inventoryRouter.get('/', getInventory)
inventoryRouter.get('/:id', getInventoryById)
inventoryRouter.post('/', insertInventory)
inventoryRouter.put('/:id', updateInventory)
inventoryRouter.delete('/:id', deleteInventory)

export default inventoryRouter
