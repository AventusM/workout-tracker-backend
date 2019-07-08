const mongoose = require('mongoose')

const workoutSchema = new mongoose.Schema({
  discipline: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  repetitions: {
    type: Number,
    required: true
  }
})

// FUTURE CHANGES
// FUTURE CHANGES

// Workout should be a collection of done disciplines
// e.g Contains an array of performed disciplines
// and a user as a separate object
// BELOW INTO Discipline model
// discipline: {
//   type: String,
//   required: true
// },
// type: {
//   type: String,
//   required: true
// },
// weight: {
//   type: Number,
//   required: true
// },
// repetitions: {
//   type: Number,
//   required: true
// }

const Workout = mongoose.model('Workout', workoutSchema)

module.exports = Workout