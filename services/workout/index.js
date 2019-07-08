const Workout = require('../../models/workout')
const Result = require('../../models/result')
const WorkoutService = require('./workout_service')

module.exports = WorkoutService(Workout, Result)