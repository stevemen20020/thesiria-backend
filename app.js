const express = require('express')
const cors = require("cors")
require('dotenv').config()
const app = express();

const router = require('./src/routes.js')
const { tempJWT } = require('./src/middleware/tempJWT')
const { doNothing} = require('./src/middleware/doNothing')

app.use(express.json())
app.use('/public', doNothing, express.static('./src/public'))
//app.use(cors())
app.use(cors({ origin: '*' ,methods: '*', allowedHeaders: ['*'], requestHeaders: ['*']}));
app.use('/rest', doNothing, router)
app.listen(process.env.PORT, () => {
    console.log(`Server Started in: ${process.env.HOST}/${process.env.VERSION}`)
    })