const test = require('ava')
const sinon = require('sinon').sandbox.create()
const Workout = require('../../../models/workout')
const WorkoutService = require('../index')

const mockFindMethods = {
  populate: function () {
    return this
  }
}

test.beforeEach(() => {
  sinon.stub(Workout, 'find').returns(mockFindMethods)
})

test.afterEach.always(() => {
  sinon.restore()
})

test('listWorkouts should return a list of all workouts', async (t) => {
  // 1. SET FIND TO RETURN SOMETHING WITH SINON (need to figure out how to work with populate first...)
  // 2. PERFORM WORKOUTS SEARCH
  // 3. COMPARE SEARCH (2) WITH ORIGINAL (1) -> IT SHOULD BE THE SAME
})