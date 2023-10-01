import  express  from "express";
import { conn } from "./db.js";
import { PORT } from "./config.js";
const app = express();

app.get('/', (req, res) => {
    res.send("Welcome")
})

app.get('/ping', async (req, res) => {

    const [result] = await conn.query('SELECT "hello world" as RESULT')
    console.log(JSON.stringify(result))
    res.json(result[0])
})

app.listen(PORT)

console.log("iniciado",PORT)