import { Router } from "express";
import { getInventoryWeapon,
        getInventoryWeaponById,
        insertInventoryWeapon,
        updateInventoryWeapon,
        deleteInventoryWeapon } from "../controller/inventory_weapon.js";

const inventoryWeaponRouter = Router()

inventoryWeaponRouter.get('/', getInventoryWeapon)
inventoryWeaponRouter.get('/:id', getInventoryWeaponById)
inventoryWeaponRouter.post('/', insertInventoryWeapon)
inventoryWeaponRouter.put('/:id', updateInventoryWeapon)
inventoryWeaponRouter.delete('/:id', deleteInventoryWeapon)

export default inventoryWeaponRouter
