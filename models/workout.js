const mongoose = require('mongoose')

// Results have also user info. It should be unnecessary in workoutSchema context
// as (currently) workout can be done by 1 person only
// in future a workout could contain multiple users...
// CURRENTLY CONSIDERING NEXT -- simply exclude user on population
// https://stackoverflow.com/questions/26915116/mongoose-mongodb-exclude-fields-from-populated-query-data
const workoutSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: () => Date.now()
  },
  results: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Result'
    }
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

const Workout = mongoose.model('Workout', workoutSchema)
module.exports = Workout