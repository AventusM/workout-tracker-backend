const workoutRouter = require('express').Router()
const Workout = require('../models/workout')

workoutRouter.get('/', async (req, res) => {
  try {
    const workouts = await Workout.find({})
    res.json(workouts.map(workout => workout.toJSON()))
  } catch (exception) {
    console.log('error', exception)
  }
})

module.exports = workoutRouter