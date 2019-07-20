const listWorkouts = Workout => () => {
  // Populate with results BUT exclude user within a single result
  // Populate user separately as workout is currently 1 person job
  return Workout.find({}).populate('results')
}

// Attach user later on
// Attach user later on
// Attach user later on
const createWorkout = (Workout, Result) => async (results, user_id) => {
  if (!(results && user_id))
    throw new Error(`Results: ${results} -- User ID: ${user_id}`)

  //1. Map results array into an array of Result objects
  // save in a bulk https://stackoverflow.com/a/36090281
  const mappedResults = results.map(data => new Result({ data, user: user_id }))
  const createdResults = await Result.insertMany(mappedResults)
  const savedResultsIds = createdResults.map(created => created._id)

  //2. set resulted array to workout results
  const workoutSession = new Workout({ results: savedResultsIds, user: user_id })
  //3. Save workout
  await workoutSession.save()
  //4. Populate from result id's for POST data return
  return workoutSession.populate('results').execPopulate()
}

const deleteAllWorkouts = Workout => () => {
  return Workout.deleteMany({})
}

// Also delete results associated with this workout?
const deleteWorkoutById = Workout => (id) => {
  return Workout.findByIdAndRemove(id)
}

module.exports = (Workout, Result) => {
  return {
    listWorkouts: listWorkouts(Workout),
    createWorkout: createWorkout(Workout, Result),
    deleteAllWorkouts: deleteAllWorkouts(Workout),
    deleteWorkoutById: deleteWorkoutById(Workout)
  }
}