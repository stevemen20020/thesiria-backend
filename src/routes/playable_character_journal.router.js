const { Router } = require("express");
const { getAllCharactersJournal, 
    getPlayableCharacterJournalById, 
    insertPlayableCharacterJournalById, 
    updatePlayableCharacterJournal, 
    deletePlayableCharacterJournal } = require ("../controller/playable_character_journal.js");

const characterJornalRouter = Router()

characterJornalRouter.get('/', getAllCharactersJournal)
characterJornalRouter.get('/:id', getPlayableCharacterJournalById)
characterJornalRouter.post('/', insertPlayableCharacterJournalById)
characterJornalRouter.put('/:id', updatePlayableCharacterJournal)
characterJornalRouter.delete('/:id', deletePlayableCharacterJournal)

module.exports =  characterJornalRouter
