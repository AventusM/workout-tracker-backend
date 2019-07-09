const mongoose = require('mongoose')

// Attaching a user could be good in considering stats etc
// Attaching related workout could be useful in tracking progress?
const resultSchema = new mongoose.Schema({
  name: {
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
  },
  sets: {
    type: Number,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

const Result = mongoose.model('Result', resultSchema)
module.exports = Result