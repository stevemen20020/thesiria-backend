import { Router } from "express";
import { getAllCharactersJournal, 
    getPlayableCharacterJournalById, 
    insertPlayableCharacterJournalById, 
    updatePlayableCharacterJournal, 
    deletePlayableCharacterJournal } from "../controller/playable_character_journal.js";

const characterJornalRouter = Router()

characterJornalRouter.get('/', getAllCharactersJournal)
characterJornalRouter.get('/:id', getPlayableCharacterJournalById)
characterJornalRouter.post('/', insertPlayableCharacterJournalById)
characterJornalRouter.put('/:id', updatePlayableCharacterJournal)
characterJornalRouter.delete('/:id', deletePlayableCharacterJournal)

export default characterJornalRouter
