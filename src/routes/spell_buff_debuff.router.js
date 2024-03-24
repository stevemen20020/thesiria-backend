import { Router } from "express";
import { getAllSpellBuffDebuff,
        getSpellBuffDebuffById,
        insertSpellBuffDebuff,
        updateSpellBuffDebuff,
        deleteSpellBuffDebuff } from "../controller/spell_buff_debuff.js";

const spellBuffDebuffRouter = Router()

spellBuffDebuffRouter.get('/', getAllSpellBuffDebuff)
spellBuffDebuffRouter.get('/:id', getSpellBuffDebuffById)
spellBuffDebuffRouter.post('/', insertSpellBuffDebuff)
spellBuffDebuffRouter.put('/:id', updateSpellBuffDebuff)
spellBuffDebuffRouter.delete('/:id', deleteSpellBuffDebuff)

export default spellBuffDebuffRouter
