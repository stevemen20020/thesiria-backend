const { Router } = require("express");
const { getAllSpells,
        getSpellsById,
        insertSpells,
        updateSpells,
        deleteSpells } = require ("../controller/spells.js");

const spellsRouter = Router()

spellsRouter.get('/', getAllSpells)
spellsRouter.get('/:id', getSpellsById)
spellsRouter.post('/', insertSpells)
spellsRouter.put('/:id', updateSpells)
spellsRouter.delete('/:id', deleteSpells)

module.exports =  spellsRouter
