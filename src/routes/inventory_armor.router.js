const { Router } = require("express");
const { getInventoryArmor,
        getInventoryArmorById,
        insertInventoryArmor,
        updateInventoryArmor,
        deleteInventoryArmor,
        transferArmor } = require ("../controller/inventory_armor.js");

const inventoryArmorRouter = Router()

inventoryArmorRouter.get('/', getInventoryArmor)
inventoryArmorRouter.get('/:id', getInventoryArmorById)
inventoryArmorRouter.post('/', insertInventoryArmor)
inventoryArmorRouter.put('/:id', updateInventoryArmor)
inventoryArmorRouter.delete('/:id', deleteInventoryArmor)
inventoryArmorRouter.patch('/transfer-armor', transferArmor)

module.exports =  inventoryArmorRouter
