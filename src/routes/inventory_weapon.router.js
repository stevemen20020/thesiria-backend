const { Router } = require("express");
const { getInventoryWeapon,
        getInventoryWeaponById,
        insertInventoryWeapon,
        updateInventoryWeapon,
        deleteInventoryWeapon } = require ("../controller/inventory_weapon.js");

const inventoryWeaponRouter = Router()

inventoryWeaponRouter.get('/', getInventoryWeapon)
inventoryWeaponRouter.get('/:id', getInventoryWeaponById)
inventoryWeaponRouter.post('/', insertInventoryWeapon)
inventoryWeaponRouter.put('/:id', updateInventoryWeapon)
inventoryWeaponRouter.delete('/:id', deleteInventoryWeapon)

module.exports =  inventoryWeaponRouter
