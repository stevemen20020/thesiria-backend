const { Router } = require("express");
const { getAllElements,
        getElementById,
        insertElement,
        updateElement,
        deleteElement } = require ("../controller/elements.js");

const elementRouter = Router()

elementRouter.get('/', getAllElements)
elementRouter.get('/:id', getElementById)
elementRouter.post('/', insertElement)
elementRouter.put('/:id', updateElement)
elementRouter.delete('/:id', deleteElement)

module.exports =  elementRouter
