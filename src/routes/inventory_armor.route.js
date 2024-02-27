import { Router } from "express";
import { getInventoryArmor,
        getInventoryArmorById,
        insertInventoryArmor,
        updateInventoryArmor,
        deleteInventoryArmor } from "../controller/inventory_armor.js";

const inventoryArmorRouter = Router()

inventoryArmorRouter.get('/', getInventoryArmor)
inventoryArmorRouter.get('/:id', getInventoryArmorById)
inventoryArmorRouter.post('/', insertInventoryArmor)
inventoryArmorRouter.put('/:id', updateInventoryArmor)
inventoryArmorRouter.delete('/:id', deleteInventoryArmor)

export default inventoryArmorRouter
