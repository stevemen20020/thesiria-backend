import { Router } from "express";
import { getAllEffects,
         getEffectById,
         insertEffect,
         updateEffect,
         deleteEffect } from "../controller/effects.js";

const effectsRouter = Router()

effectsRouter.get('/', getAllEffects)
effectsRouter.get('/:id', getEffectById)
effectsRouter.post('/', insertEffect)
effectsRouter.put('/:id', updateEffect)
effectsRouter.delete('/:id', deleteEffect)

export default effectsRouter
