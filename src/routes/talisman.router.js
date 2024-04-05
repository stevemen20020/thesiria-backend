const { Router } = require("express");
const { getAllTalismanes,
        getTalismanById,
        insertTalisman,
        updateTalisman,
        deleteTalisman, } = require ("../controller/talismanes.js");

const talismanRouter = Router()

talismanRouter.get('/', getAllTalismanes)
talismanRouter.get('/:id', getTalismanById)
talismanRouter.post('/', insertTalisman)
talismanRouter.put('/:id', updateTalisman)
talismanRouter.delete('/:id', deleteTalisman)

module.exports =  talismanRouter
