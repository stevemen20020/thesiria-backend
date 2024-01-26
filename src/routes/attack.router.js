import { Router } from "express";
import { getAllAttacks,
        getAttackById,
        insertAttack,
        updateAttack,
        deleteAttack } from "../controller/attack.js";

const attackRouter = Router()

attackRouter.get('/', getAllAttacks)
attackRouter.get('/:id', getAttackById)
attackRouter.post('/', insertAttack)
attackRouter.put('/:id', updateAttack)
attackRouter.delete('/:id', deleteAttack)

export default attackRouter
