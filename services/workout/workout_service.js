const listWorkouts = Workout => () => {
  return Workout.find({})
}

const createWorkout = Workout => (content) => {
  if (!content)
    throw new Error(`Content: ${content}`)

  const session = new Workout({ content })
  return session.save()
}

module.exports = Workout => {
  return {
    listWorkouts: listWorkouts(Workout),
    createWorkout: createWorkout(Workout)
  }
}