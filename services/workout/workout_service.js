const listWorkouts = Workout => () => {
  // Populate with results BUT exclude user within a single result
  // Populate user separately as workout is currently 1 person job
  return Workout.find({}).populate('results')
}

// Attach user later on
// Result could also know about in which workout it was performed in?
const createWorkout = (Workout, Result) => async (results) => {
  if (!(results))
    throw new Error(`Results: ${results}`)

  //1. Map results array into an array of Result objects
  // save in a bulk https://stackoverflow.com/a/36090281
  const mappedResults = results.map(data => new Result(data))
  const createdResults = await Result.insertMany(mappedResults)
  const savedResultsIds = createdResults.map(created => created._id)

  //2. set resulted array to workout results
  const workoutSession = new Workout({ results: savedResultsIds })
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