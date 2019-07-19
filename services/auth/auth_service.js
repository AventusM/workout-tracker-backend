const passport = require('passport')
const Strategy = require('passport-local').Strategy
const User = require('../../models/user')

passport.use(new Strategy(
  async (username, password, done) => {
    const foundUser = await User.findOne({ username })
    if (!foundUser) {
      return done(null, false)
    } else if (!foundUser.verifyPassword(password)) {
      return done(null, false)
    } else {
      return done(null, foundUser)
    }
  }
))

passport.serializeUser((user, done) => {
  done(null, user._id)
})

passport.deserializeUser(async (id, done) => {
  const deserializedUser = await User.findById(id)
  done(null, deserializedUser)
})