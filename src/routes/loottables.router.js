const { Router } = require("express");
const { getLoottables,
        getLoottablesById,
        insertLoottables,
        updateLoottables,
        deleteLoottables } = require ("../controller/loottables.js");

const loottablesRouter = Router()

loottablesRouter.get('/', getLoottables)
loottablesRouter.get('/:id', getLoottablesById)
loottablesRouter.post('/', insertLoottables)
loottablesRouter.put('/:id', updateLoottables)
loottablesRouter.delete('/:id', deleteLoottables)

module.exports =  loottablesRouter
