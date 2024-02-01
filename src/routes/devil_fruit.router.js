import { Router } from "express";
import { getAllDevilFruits,
        getDevilFruitById,
        insertDevilFruit,
        updateDevilFruit,
        deleteDevilFruit } from "../controller/devil_fruit.js";

const devilFruitRouter = Router()

devilFruitRouter.get('/', getAllDevilFruits)
devilFruitRouter.get('/:id', getDevilFruitById)
devilFruitRouter.post('/', insertDevilFruit)
devilFruitRouter.put('/:id', updateDevilFruit)
devilFruitRouter.delete('/:id', deleteDevilFruit)

export default devilFruitRouter
