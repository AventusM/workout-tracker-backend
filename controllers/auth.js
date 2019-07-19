const authRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')
const passport = require('passport')

authRouter.get('/current_user', async (req, res, next) => {
  try {
    res.json(req.user)
  } catch (exception) {
    next(exception)
  }
})

authRouter.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), async (req, res, next) => {
  try {
    // Redirect to logged in index
    // Is it necessary?
    res.redirect('/')
  } catch (exception) {
    next(exception)
  }
})

authRouter.post('/register', async (req, res, next) => {
  try {
    const { username, password } = req.body
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const newUser = new User({
      username,
      passwordHash
    })

    const newSavedUser = await newUser.save()
    res.json(newSavedUser)
  } catch (exception) {
    next(exception)
  }
})

module.exports = authRouter