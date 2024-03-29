const WorkoutService = require('../../services/workout/index')

const getAllWorkouts = async (req, res, next) => {
  try {
    const workouts = await WorkoutService.listWorkouts()
    res.status(200).json(workouts)
  } catch (exception) {
    next(exception)
  }
}

const createNewWorkout = async (req, res, next) => {
  try {
    // Add createdAt field so user can choose the day workout was performed at
    const { results } = req.body
    const user_id = req.user._id

    // Only user id required so that mongoose can populate path later
    // -> Get user data from request. No need to find user separately
    const createdWorkout = await WorkoutService.createWorkout(results, user_id)
    res.status(200).json(createdWorkout)
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