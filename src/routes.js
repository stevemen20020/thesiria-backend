const express = require('express')
const router = express.Router()
module.exports = router

const { get } = require('./controller/get')
const { insert } = require('./controller/insert')
const { update } = require('./controller/update')
const { del } = require('./controller/delete')

const { doNothing} = require('./middleware/doNothing')

router.get(`/${process.env.VERSION}/:model`, doNothing, get)
router.post(`/${process.env.VERSION}/:model`, insert)
router.put(`/${process.env.VERSION}/:model`, update)
router.delete(`/${process.env.VERSION}/:model`, del)
