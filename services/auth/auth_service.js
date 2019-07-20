const passport = require('passport')
const Strategy = require('passport-local').Strategy
const User = require('../../models/user')
const bcrypt = require('bcrypt')

passport.use(new Strategy(
  async (username, password, done) => {
    const foundUser = await User.findOne({ username })
    console.log('found user', foundUser)
    if (!foundUser) {
      console.log('not found')
      return done(null, false)
    } else if (!foundUser.verifyPassword(password)) {
      console.log('pw mismatch')
      return done(null, false)
    } else {
      console.log('OK!')
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

const registerNewUser = async (username, password) => {
  if (!(username && password))
    throw new Error(`Username: ${username} -- pw: ${password}`)
    
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const newUser = new User({
    username,
    passwordHash
  })

  return await newUser.save()
}

module.exports = {
  registerNewUser
}