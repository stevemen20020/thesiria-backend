const { Router } = require("express");
const { getAllSpellBuffDebuff,
        getSpellBuffDebuffById,
        insertSpellBuffDebuff,
        updateSpellBuffDebuff,
        deleteSpellBuffDebuff } = require ("../controller/spell_buff_debuff.js");

const spellBuffDebuffRouter = Router()

spellBuffDebuffRouter.get('/', getAllSpellBuffDebuff)
spellBuffDebuffRouter.get('/:id', getSpellBuffDebuffById)
spellBuffDebuffRouter.post('/', insertSpellBuffDebuff)
spellBuffDebuffRouter.put('/:id', updateSpellBuffDebuff)
spellBuffDebuffRouter.delete('/:id', deleteSpellBuffDebuff)

module.exports =  spellBuffDebuffRouter
