const workoutRouter = require('express').Router()
const WorkoutService = require('../services/workout')

workoutRouter.get('/', async (req, res, next) => {
  try {
    const workouts = await WorkoutService.listWorkouts()
    res.json(workouts)
  } catch (exception) {
    next(exception)
  }
})

workoutRouter.use((req, res, next) => {
  res.status(404).json({ error: 'not found' })
})

workoutRouter.use((err, req, res, next) => {
  res.status(500).json({ error: err.message })
})

module.exports = workoutRouter