require('dotenv').config()

let PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI
let COOKIE_KEY = process.env.COOKIE_KEY

module.exports = {
  MONGODB_URI,
  PORT,
  COOKIE_KEY
}