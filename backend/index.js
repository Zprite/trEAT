import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express()
const PORT = 8000

// handle json
app.use(bodyParser.json({ extended: true }))

// origins should be spesified in prod
app.use(cors())

// routes
app.get('/', (req, res) => {
    res.send("hello world");
})


app.listen(PORT, () => console.log(`Example app listening on port ${PORT}...`))
