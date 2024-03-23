import express, { json, query } from 'express'
import cors from 'cors'
import generate from './generateSQL.js';

const app = express()

app.use(cors());
app.use(express.json())

const port = process.env.PORT || 3005;

app.get('/', (req, res) => {
    res.send('Hello World from our Api')
})

app.post("/generate", async (req, res) => {
    const query = req.body.prompt;
    try {
        const sqlQuery = await generate(query)
        res.json({ response: sqlQuery })
    } catch(err) {
        console.error(err)
        res.status(500).send("Internal server Error")
    }
})

app.listen(port, () => {
    console.log('Listening on port ',port)
})