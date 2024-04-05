const { Router } = require("express");
const { getAllObjects,
        getObjectById,
        insertObject,
        updateObject,
        deleteObject } = require ("../controller/objects.js");

const objectRouter = Router()

objectRouter.get('/', getAllObjects)
objectRouter.get('/:id', getObjectById)
objectRouter.post('/', insertObject)
objectRouter.put('/:id', updateObject)
objectRouter.delete('/:id', deleteObject)

module.exports =  objectRouter
