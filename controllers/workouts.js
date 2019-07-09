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

workoutRouter.post('/', async (req, res, next) => {
  try {
    const { results } = req.body
    // Only user id required so that mongoose can populate path later
    // -> Get user data from request. No need to find user separately
    const createdWorkout = await WorkoutService.createWorkout(results)
    res.json(createdWorkout)
  } catch (exception) {
    next(exception)
  }
})

// For testing purposes only
workoutRouter.delete('/all', async (req, res, next) => {
  try {
    await WorkoutService.deleteAllWorkouts()
    res.status(204).end()
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