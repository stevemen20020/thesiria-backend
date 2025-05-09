const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');
const router = require('./src/routes.js');
const http = require('http');
const { fight_engine } = require('./src/app/fight_engine.js')

dotenv.config()
const app = express();
const server = http.createServer(app);

app.use(express.json())

app.use('/public', express.static('./src/public'))
app.use('/character-image', express.static('./src/public/characters'))
app.use('/monster-image', express.static('./src/public/monsters'))
app.use('/tile-image', express.static('./src/public'))
app.use('/weapon-image', express.static('./src/public/weapons'))
app.use('/armor-image', express.static('./src/public/armors'))
app.use(cors({ origin: '*' ,methods: '*', allowedHeaders: ['*'], requestHeaders: ['*']}));
app.use(`/rest/${process.env.VERSION}`, router)

fight_engine(server)
server.listen(process.env.PORT, () => {
    console.log(`Server Started in: ${process.env.HOST}/${process.env.VERSION}`)
})