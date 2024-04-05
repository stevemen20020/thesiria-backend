const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');
const router = require('./src/routes.js');
const http = require('http');

dotenv.config()
const app = express();
const server = http.createServer(app);

app.use(express.json())

app.use('/public', express.static('./src/public'))
app.use('/character-image', express.static('./src/public/characters'))
app.use('/tile-image', express.static('./src/public'))
app.use('/weapon-image', express.static('./src/public/weapons'))
app.use(cors({ origin: '*' ,methods: '*', allowedHeaders: ['*'], requestHeaders: ['*']}));
app.use(`/rest/${process.env.VERSION}`, router)

server.listen(process.env.PORT, () => {
    console.log(`Server Started in: ${process.env.HOST}/${process.env.VERSION}`)
})