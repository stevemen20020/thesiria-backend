const { Router } = require("express");
const { getMonsterById,
        getAllMonster,
        insertMonster,
        updateMonster,
        deleteMonster} = require ("../controller/monster.js");

const monsterRouter = Router()

monsterRouter.get('/', getAllMonster)
monsterRouter.get('/:id', getMonsterById)
monsterRouter.post('/', insertMonster)
monsterRouter.put('/:id', updateMonster)
monsterRouter.delete('/:id', deleteMonster)

module.exports =  monsterRouter
