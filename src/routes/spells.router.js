import { Router } from "express";
import { getAllSpells,
        getSpellsById,
        insertSpells,
        updateSpells,
        deleteSpells } from "../controller/spells.js";

const spellsRouter = Router()

spellsRouter.get('/', getAllSpells)
spellsRouter.get('/:id', getSpellsById)
spellsRouter.post('/', insertSpells)
spellsRouter.put('/:id', updateSpells)
spellsRouter.delete('/:id', deleteSpells)

export default spellsRouter
