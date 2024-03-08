import { Router } from "express";
import { getLoottables,
        getLoottablesById,
        insertLoottables,
        updateLoottables,
        deleteLoottables } from "../controller/loottables.js";

const loottablesRouter = Router()

loottablesRouter.get('/', getLoottables)
loottablesRouter.get('/:id', getLoottablesById)
loottablesRouter.post('/', insertLoottables)
loottablesRouter.put('/:id', updateLoottables)
loottablesRouter.delete('/:id', deleteLoottables)

export default loottablesRouter
