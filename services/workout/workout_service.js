const Workout = require('../../models/workout')
const Result = require('../../models/result')

const listWorkouts = () => {
  return Workout.find({}).populate('results')
}

const createWorkout = async (results, user_id) => {
  if (!(results && user_id))
    throw new Error(`Results: ${results} -- User ID: ${user_id}`)

  const mappedResults = results.map(data => new Result({ data, user: user_id }))
  // save in a bulk https://stackoverflow.com/a/36090281
  const createdResults = await Result.insertMany(mappedResults)
  // map id's to be saved for workout session
  const savedResultsIds = createdResults.map(created => created._id)

  const workoutSession = new Workout({ results: savedResultsIds, user: user_id })
  await workoutSession.save()
  return workoutSession.populate('results').execPopulate()
}

// Also delete results associated with this workout?
const deleteWorkoutById = (id) => {
  return Workout.findByIdAndRemove(id)
}

const deleteAllWorkouts = () => {
  return Workout.deleteMany({})
}

module.exports = {
  listWorkouts,
  createWorkout,
  deleteAllWorkouts,
  deleteWorkoutById
}