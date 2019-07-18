const passport = require('passport')
const Strategy = require('passport-local').Strategy
const User = require('../../models/user')

passport.use(new Strategy(
  async (username, password, done) => {
    const foundUser = await User.find({ username })

    if (!foundUser) {
      console.log('user not found')
      return done(null, false)
    }
    if (password !== foundUser.password) {
      console.log('user found, password mismatch')
      return done(null, false)
    }
    return done(null, foundUser)
  }
))

passport.serializeUser((user, done) => {
  done(null, user._id)
})

passport.deserializeUser(async (id, done) => {
  const deserializedUser = User.findById(id)
  done(null, deserializedUser)
})