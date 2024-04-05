const { Router } = require("express");
const { getAllHakis,
        getHakiById,
        insertHaki,
        updateHaki,
        deleteHaki } = require ("../controller/haki.js");

const hakiRouter = Router()

hakiRouter.get('/', getAllHakis)
hakiRouter.get('/:id', getHakiById)
hakiRouter.post('/', insertHaki)
hakiRouter.put('/:id', updateHaki)
hakiRouter.delete('/:id', deleteHaki)

module.exports =  hakiRouter
