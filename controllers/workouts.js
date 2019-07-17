const workoutRouter = require('express').Router()
const {
  getAllWorkouts,
  createNewWorkout,
  deleteSingleWorkoutById,
  deleteAllWorkouts
} = require('../handlers/workout/index')

workoutRouter.get('/', getAllWorkouts)
workoutRouter.post('/', createNewWorkout)
workoutRouter.delete('/all', deleteAllWorkouts)
workoutRouter.delete('/:id', deleteSingleWorkoutById)

// MOVE MIDDLEWARES SOMEWHERE ELSE
// MOVE MIDDLEWARES SOMEWHERE ELSE
// MOVE MIDDLEWARES SOMEWHERE ELSE
workoutRouter.use((req, res, next) => {
  res.status(404).json({ error: 'not found' })
})

workoutRouter.use((err, req, res, next) => {
  res.status(500).json({ error: err.message })
})

module.exports = workoutRouter