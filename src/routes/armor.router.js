const { Router } = require("express");
const { getAllArmors,
        getArmorById,
        insertArmor,
        updateArmor,
        deleteArmor } = require( "../controller/armor.js");

const armorRouter = Router()

armorRouter.get('/', getAllArmors)
armorRouter.get('/:id', getArmorById)
armorRouter.post('/', insertArmor)
armorRouter.put('/:id', updateArmor)
armorRouter.delete('/:id', deleteArmor)

module.exports =  armorRouter
