import { Router } from "express";
import { getAllArmors,
        getArmorById,
        insertArmor,
        updateArmor,
        deleteArmor } from "../controller/armor.js";

const armorRouter = Router()

armorRouter.get('/', getAllArmors)
armorRouter.get('/:id', getArmorById)
armorRouter.post('/', insertArmor)
armorRouter.put('/:id', updateArmor)
armorRouter.delete('/:id', deleteArmor)

export default armorRouter
