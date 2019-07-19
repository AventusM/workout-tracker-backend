const config = require('./utils/config')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const cookieSession = require('cookie-session')
const passport = require('passport')
const mongoose = require('mongoose')

console.log('connecting to', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

// Not exporting anything from local strategy file so have to require it this way for it to apply in this application
require('./services/auth/auth_service')

app.use(cookieSession({ maxAge: 60 * 60 * 1000 * 24, keys: 'test-key' }))
app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json())
app.use(passport.initialize())
app.use(passport.session())


const workoutRouter = require('./controllers/workouts')
const resultRouter = require('./controllers/results')
const authRouter = require('./controllers/auth')
app.use('/auth', authRouter)
app.use('/api/workouts', workoutRouter)
app.use('/api/results', resultRouter)

module.exports = app