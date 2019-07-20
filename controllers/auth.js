const authRouter = require('express').Router()
const passport = require('passport')
const { get_current_user, login, logout, register } = require('../handlers/auth/index')

authRouter.get('/current_user', get_current_user)
authRouter.get('/logout', logout)
authRouter.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), login)
authRouter.post('/register', register)

module.exports = authRouter