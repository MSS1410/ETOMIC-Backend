require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const connectDB = require('./config/db')

//rutas

const routerEvent = require('./routes/Event')
const routerUser = require('./routes/User')
const routerEventMedia = require('./routes/EventMedia')
const routerFlyer = require('./routes/eventFlyer')
const routerImg = require('./routes/eventImage')
const routerProfileImg = require('./routes/profileImg')

const app = express()
app.use(express.json())

const PORT = 3051
connectDB()
app.use(cors())

//routers

app.use('/api/v1/events', routerEvent)
app.use('/api/v1/users', routerUser)
app.use('/api/v1/event-media', routerEventMedia)
app.use('/api/v1/flyer-media', routerFlyer)
app.use('/api/v1/event-img', routerImg)
app.use('/api/v1/users/profile', routerProfileImg)

//??????
const path = require('path')
const FRONT_PATH = path.join(__dirname, '..', 'front')

app.use(express.static(FRONT_PATH))
app.get('*', (req, res) => {
  res.sendFile(path.join(FRONT_PATH, 'index.html'))
})

//500
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ message: err.message, stack: err.stack })
})

app.listen(PORT, () => {
  console.log(`🎧🎭 ETOMIC  en: http://localhost:${PORT}`)
})
