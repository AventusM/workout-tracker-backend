const listWorkouts = Workout => () => {
  return Workout.find({})
}

module.exports = Workout => {
  return {
    listWorkouts: listWorkouts(Workout)
  }
}