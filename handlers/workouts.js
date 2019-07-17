const WorkoutService = require('../services/workout/index')

const getAllWorkouts = async (req, res, next) => {
  try {
    const workouts = await WorkoutService.listWorkouts()
    res.json(workouts)
  } catch (exception) {
    next(exception)
  }
}

const createNewWorkout = async (req, res, next) => {
  try {
    // Add createdAt field so user can choose the day workout was performed at
    console.log('body', req.body)
    const { results } = req.body

    // Only user id required so that mongoose can populate path later
    // -> Get user data from request. No need to find user separately
    const createdWorkout = await WorkoutService.createWorkout(results)
    res.json(createdWorkout)
  } catch (exception) {
    next(exception)
  }
}

const deleteSingleWorkoutById = async (req, res, next) => {
  try {
    const { id } = req.params
    await WorkoutService.deleteWorkoutById(id)
    res.status(204).end()
  } catch (exception) {
    next(exception)
  }
}

const deleteAllWorkouts = async (req, res, next) => {
  try {
    await WorkoutService.deleteAllWorkouts()
    res.status(204).end()
  } catch (exception) {
    next(exception)
  }
}

module.exports = {
  getAllWorkouts,
  createNewWorkout,
  deleteSingleWorkoutById,
  deleteAllWorkouts
}