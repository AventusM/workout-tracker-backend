const listAllResults = Result => () => {
  return Result.find({})
}

module.exports = Result => {
  return {
    listAllResults: listAllResults(Result)
  }
}