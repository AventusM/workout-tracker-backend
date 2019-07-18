const authRouter = require('express').Router()

authRouter.get('/current_user', async (req, res, next) => {
  try {
  } catch (exception) {
    next(exception)
  }
})

module.exports = authRouter