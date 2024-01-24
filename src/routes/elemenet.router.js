import { Router } from "express";
import { getAllElements,
        getElementById,
        insertElement,
        updateElement,
        deleteElement } from "../controller/elements.js";

const elementRouter = Router()

elementRouter.get('/', getAllElements)
elementRouter.get('/:id', getElementById)
elementRouter.post('/', insertElement)
elementRouter.put('/:id', updateElement)
elementRouter.delete('/:id', deleteElement)

export default elementRouter
