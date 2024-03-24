import express from "express";
import cors from "cors"
import * as dotenv from 'dotenv'
import router from './src/routes.js';

dotenv.config()
const app = express();

app.use(express.json())

app.use('/public', express.static('./src/public'))
app.use('/character-image', express.static('./src/public/characters'))
app.use('/tile-image', express.static('./src/public'))
app.use('/weapon-image', express.static('./src/public/weapons'))
app.use(cors({ origin: '*' ,methods: '*', allowedHeaders: ['*'], requestHeaders: ['*']}));
app.use(`/rest/${process.env.VERSION}`, router)

app.listen(process.env.PORT, () => {
    console.log(`Server Started in: ${process.env.HOST}/${process.env.VERSION}`)
})