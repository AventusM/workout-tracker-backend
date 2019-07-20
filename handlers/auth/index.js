const User = require('../../models/user')
const AuthService = require('../../services/auth/index')

const get_current_user = async (req, res, next) => {
  try {
    res.json(req.user)
  } catch (exception) {
    next(exception)
  }
}

const logout = async (req, res, next) => {
  try {
    req.session = null
    res.status(200).redirect('/')
  } catch (exception) {
    next(exception)
  }
}

const login = async (req, res, next) => {
  try {
    // Redirect to logged in index
    // Is it necessary?
    res.redirect('/')
  } catch (exception) {
    next(exception)
  }
}

const register = async (req, res, next) => {
  try {
    const { username, password } = req.body
    const newSavedUser = await AuthService.registerNewUser(username, password)
    res.json(newSavedUser)
  } catch (exception) {
    next(exception)
  }
}

module.exports = {
  get_current_user,
  logout,
  login,
  register
}