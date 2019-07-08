const listWorkouts = Workout => () => {
  return Workout.find({})
}

const createWorkout = Workout => (discipline, type, weight, repetitions) => {
  if (!(discipline && type && weight && repetitions))
    throw new Error(`Name: ${discipline} -- Type: ${type} -- Weight (kg): ${weight} -- Repetitions: ${repetitions}`)

  const workoutSession = new Workout({ discipline, type, weight, repetitions })
  return workoutSession.save()
}

const deleteAllWorkouts = Workout => () => {
  return Workout.deleteMany({})
}

module.exports = Workout => {
  return {
    listWorkouts: listWorkouts(Workout),
    createWorkout: createWorkout(Workout),
    deleteAllWorkouts: deleteAllWorkouts(Workout)
  }
}