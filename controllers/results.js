const resultsRouter = require('express').Router()
const ResultService = require('../services/result')

resultsRouter.get('/', async (req, res, next) => {
  try {
    const results = await ResultService.listAllResults()
    res.json(results)
  } catch (exception) {
    next(exception)
  }
})

module.exports = resultsRouter