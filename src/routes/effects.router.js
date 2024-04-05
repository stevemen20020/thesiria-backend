const { Router } = require("express");
const { getAllEffects,
         getEffectById,
         insertEffect,
         updateEffect,
         deleteEffect } = require ("../controller/effects.js");

const effectsRouter = Router()

effectsRouter.get('/', getAllEffects)
effectsRouter.get('/:id', getEffectById)
effectsRouter.post('/', insertEffect)
effectsRouter.put('/:id', updateEffect)
effectsRouter.delete('/:id', deleteEffect)

module.exports =  effectsRouter
