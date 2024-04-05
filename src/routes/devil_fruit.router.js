const { Router } = require("express");
const { getAllDevilFruits,
        getDevilFruitById,
        insertDevilFruit,
        updateDevilFruit,
        deleteDevilFruit } = require ("../controller/devil_fruit.js");

const devilFruitRouter = Router()

devilFruitRouter.get('/', getAllDevilFruits)
devilFruitRouter.get('/:id', getDevilFruitById)
devilFruitRouter.post('/', insertDevilFruit)
devilFruitRouter.put('/:id', updateDevilFruit)
devilFruitRouter.delete('/:id', deleteDevilFruit)

module.exports =  devilFruitRouter
