const test = require('ava')
const sinon = require('sinon').sandbox.create()
const Workout = require('../../../models/workout')
const WorkoutService = require('../index')

// Check listWorkouts method to see correct data model
const originalData = [{ message: 'hi' }]

// 1. SET FIND TO RETURN SOMETHING WITH SINON (need to figure out how to work with populate first...)
test.beforeEach(() => {
  sinon.stub(Workout, 'find').returns({
    populate: sinon.stub().returns(originalData)
  })
})

test.afterEach.always(() => {
  sinon.restore()
})

test('listWorkouts should return a list of all workouts', async (t) => {
  // 2. PERFORM WORKOUTS SEARCH
  const foundWorkouts = await WorkoutService.listWorkouts()
  // console.log('found workouts', foundWorkouts)
  // console.log('mock workouts', originalData)
  // 3. COMPARE SEARCH (2) WITH ORIGINAL (1) -> IT SHOULD BE THE SAME
  t.is(foundWorkouts, originalData)
})