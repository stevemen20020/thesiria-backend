const { Router } = require("express");
const { getAllAttacks,
        getAttackById,
        insertAttack,
        updateAttack,
        deleteAttack } = require("../controller/attack.js");

const attackRouter = Router()

attackRouter.get('/', getAllAttacks)
attackRouter.get('/:id', getAttackById)
attackRouter.post('/', insertAttack)
attackRouter.put('/:id', updateAttack)
attackRouter.delete('/:id', deleteAttack)

module.exports =  attackRouter
