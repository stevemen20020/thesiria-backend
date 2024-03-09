import { Router } from "express";
import { getMonsterById,
        getAllMonster,
        insertMonster,
        updateMonster,
        deleteMonster} from "../controller/monster.js";

const monsterRouter = Router()

monsterRouter.get('/', getAllMonster)
monsterRouter.get('/:id', getMonsterById)
monsterRouter.post('/', insertMonster)
monsterRouter.put('/:id', updateMonster)
monsterRouter.delete('/:id', deleteMonster)

export default monsterRouter
