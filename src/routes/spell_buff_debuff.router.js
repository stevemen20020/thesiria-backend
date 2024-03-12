import { Router } from "express";
import { getAllSpellBuffDebuff,
        getSpellBuffDebuffById,
        insertSpellBuffDebuff,
        updateSpellBuffDebuff,
        deleteSpellBuffDebuff } from "../controller/spell_buff_debuff.js";

const devilSpellBuffDebuff = Router()

devilSpellBuffDebuff.get('/', getAllSpellBuffDebuff)
devilSpellBuffDebuff.get('/:id', getSpellBuffDebuffById)
devilSpellBuffDebuff.post('/', insertSpellBuffDebuff)
devilSpellBuffDebuff.put('/:id', updateSpellBuffDebuff)
devilSpellBuffDebuff.delete('/:id', deleteSpellBuffDebuff)

export default spellBuffDebuffRouter
