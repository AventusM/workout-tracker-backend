const mongoose = require('mongoose')

const workoutSchema = new mongoose.Schema({
  content: String
})

const Workout = mongoose.model('Workout', workoutSchema)

module.exports = Workout