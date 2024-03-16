import { Router } from "express";
import { getAllCharactersJournal, 
    getPlayableCharacterJournalById, 
    insertPlayableCharacterJournalById, 
    updatePlayableCharacterJournal, 
    deletePlayableCharacterJournal } from "../controller/playable_character_journal.js";

const characterRouterJournal = Router()

characterRouterJournal.get('/', getAllCharactersJournal)
characterRouterJournal.get('/:id', getPlayableCharacterJournalById)
characterRouterJournal.post('/', insertPlayableCharacterJournalById)
characterRouterJournal.put('/:id', updatePlayableCharacterJournal)
characterRouterJournal.delete('/:id', deletePlayableCharacterJournal)

export default characterJornalRouter
