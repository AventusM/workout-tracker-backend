const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  username: String,
  passwordHash: String
})

// ARROW FUNCTION WILL NOT WORK
// https://stackoverflow.com/a/56339604
userSchema.methods.verifyPassword = function (password) {
  return bcrypt.compare(password, this.passwordHash)
}

const User = mongoose.model('User', userSchema)
module.exports = User