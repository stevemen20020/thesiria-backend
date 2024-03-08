import { Router } from "express";
import {getMissionJournal,
        getMissionJournalById,
        insertMissionJournal,
        updateMissionJournal,
        deleteMissionJournal} from "../controller/mission_journal.js"

const missionJournalRouter = Router()

missionJournalRouter.get('/', getMissionJournal)
missionJournalRouter.get('/:id', getMissionJournalById)
missionJournalRouter.post('/', insertMissionJournal)
missionJournalRouter.put('/:id', updateMissionJournal)
missionJournalRouter.delete('/:id', deleteMissionJournal)

export default missionJournalRouter
