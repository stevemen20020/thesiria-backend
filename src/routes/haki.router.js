import { Router } from "express";
import { getAllHakis,
        getHakiById,
        insertHaki,
        updateHaki,
        deleteHaki } from "../controller/haki.js";

const hakiRouter = Router()

hakiRouter.get('/', getAllHakis)
hakiRouter.get('/:id', getHakiById)
hakiRouter.post('/', insertHaki)
hakiRouter.put('/:id', updateHaki)
hakiRouter.delete('/:id', deleteHaki)

export default hakiRouter
