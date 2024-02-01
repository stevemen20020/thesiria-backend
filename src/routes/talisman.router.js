import { Router } from "express";
import { getAllTalismanes,
        getTalismanById,
        insertTalisman,
        updateTalisman,
        deleteTalisman, } from "../controller/talismanes.js";

const talismanRouter = Router()

talismanRouter.get('/', getAllTalismanes)
talismanRouter.get('/:id', getTalismanById)
talismanRouter.post('/', insertTalisman)
talismanRouter.put('/:id', updateTalisman)
talismanRouter.delete('/:id', deleteTalisman)

export default talismanRouter
