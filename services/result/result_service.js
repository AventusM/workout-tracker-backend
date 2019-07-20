const Result = require('../../models/result')

const listAllResults = () => {
  return Result.find({})
}

module.exports = {
  listAllResults
}
