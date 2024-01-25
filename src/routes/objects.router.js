import { Router } from "express";
import { getAllObjects,
        getObjectById,
        insertObject,
        updateObject,
        deleteObject } from "../controller/objects.js";

const objectRouter = Router()

objectRouter.get('/', getAllObjects)
objectRouter.get('/:id', getObjectById)
objectRouter.post('/', insertObject)
objectRouter.put('/:id', updateObject)
objectRouter.delete('/:id', deleteObject)

export default objectRouter
