const { Router } = require("express");
const { getMissionJournal,
        getMissionJournalById,
        insertMissionJournal,
        updateMissionJournal,
        deleteMissionJournal} = require ("../controller/mission_journal.js");

const missionJournalRouter = Router()

missionJournalRouter.get('/', getMissionJournal)
missionJournalRouter.get('/:id', getMissionJournalById)
missionJournalRouter.post('/', insertMissionJournal)
missionJournalRouter.put('/:id', updateMissionJournal)
missionJournalRouter.delete('/:id', deleteMissionJournal)

module.exports =  missionJournalRouter
