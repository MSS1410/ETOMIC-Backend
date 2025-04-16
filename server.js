require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const connectDB = require('./back/src/config/db')

//rutas

const routerEvent = require('./back/src/api/routes/Event')
const routerUser = require('./back/src/api/routes/User')
const routerEventMedia = require('./back/src/api/routes/EventMedia')
const routerFlyer = require('./back/src/api/routes/eventFlyer')
const routerImg = require('./back/src/api/routes/eventImage')
const routerProfileImg = require('./back/src/api/routes/profileImg')

const app = express()
app.use(express.json())

const PORT = 3050
connectDB()
app.use(cors())

//routers

app.use('/api/v1/events', routerEvent)
app.use('/api/v1/users', routerUser)
app.use('/api/v1/event-media', routerEventMedia)
app.use('/api/v1/flyer-media', routerFlyer)
app.use('/api/v1/event-img', routerImg)
app.use('/api/v1/users/profile', routerProfileImg)

app.use((req, res, next) => {
  res
    .status(404)
    .json({ message: '... ETOMIC - Electronic Techno Music Events' })
})

//500
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Intern issue' })
})

app.listen(PORT, () => {
  console.log(`🎧🎭 ETOMIC  en: http://localhost:${PORT}`)
})
