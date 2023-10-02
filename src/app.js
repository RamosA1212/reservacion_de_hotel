import  express  from "express";
import { conn } from "./db.js";
import { PORT } from "./config.js";
import habitacionesRoutes from './routes/habitaciones.routes.js';
const app = express();
app.use(express.json())

app.get('/', (req, res) => {
    res.send("Welcome")
})

app.get('/ping', async (req, res) => {

    const [result] = await conn.query('SELECT "hello world" as RESULT')
    console.log(JSON.stringify(result))
    res.json(result[0])
})
app.get('/create', async (req, res) => {



   const result =  await conn.query('INSERT INTO habitaciones (numero,tipo,valor) VALUES (2,"avip",400)')
   res.json(JSON.stringify(result))

})

app.get('/ver', async (req, res) => {
    const [rows] = await conn.query('SELECT * FROM habitaciones')
    console.log(JSON.stringify(rows))
        res.send(rows)
})

app.use('/api',habitacionesRoutes)

app.listen(PORT)

console.log("iniciado",PORT)