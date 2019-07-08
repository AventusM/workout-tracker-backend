const listWorkouts = Workout => () => {
  // Populate with results BUT exclude user within a single result
  // Populate user separately as workout is currently 1 person job
  return Workout.find({})
}

// Attach user later on
const createWorkout = (Workout, Result) => (results) => {
  console.log('results', results)
  if (!(results))
    throw new Error(`Results: ${results}`)

  //1. Map results array into an array of Result objects
  //2. set resulted array to workout results
  const workoutSession = new Workout({ results: [] })
  // workoutSession.results = ...
  return workoutSession.save()
}

const deleteAllWorkouts = Workout => () => {
  return Workout.deleteMany({})
}

module.exports = (Workout, Result) => {
  return {
    listWorkouts: listWorkouts(Workout),
    createWorkout: createWorkout(Workout, Result),
    deleteAllWorkouts: deleteAllWorkouts(Workout)
  }
}