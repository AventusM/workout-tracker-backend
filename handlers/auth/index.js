const User = require('../../models/user')
const AuthService = require('../../services/auth/index')

const get_current_user = async (req, res, next) => {
  try {

    if (!req.user) {
      return res.status(401).json({ message: 'you are not logged in' })
    }

    res.json(req.user)
  } catch (exception) {
    next(exception)
  }
}

const logout = async (req, res, next) => {
  try {
    req.session = null
    res.status(200)
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
    const { username, password, passwordDuplicate } = req.body

    if (password !== passwordDuplicate) {
      return res.status(400).json({ message: 'password and password confirmation do not match' })
    }

    if (!(username && password)) {
      return res.status(400).json({ message: 'username or password missing' })
    }

    const newSavedUser = await AuthService.registerNewUser(username, password)
    res.status(200).json(newSavedUser)
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