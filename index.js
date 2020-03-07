const express = require('express')
const app = express()
const PORT = 3033

const setupDB = require('./config/database')
const router = require('./config/routes')
//connect to database
setupDB()

app.use(express.json())
app.use('/', router)

app.get('/', (req,res) => {
    res.send('welcome to ticket master')
})

app.listen(PORT, () => {
    console.log('listening to port '+ PORT)
})