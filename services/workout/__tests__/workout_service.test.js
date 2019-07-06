const WorkoutService = require('../workout_service')
const sinon = require('sinon')

describe('WorkoutService test', () => {
  it('Service is defined', () => {
    expect(WorkoutService).toBeDefined()
  })
})

describe('listWorkouts test', () => {
  it('lists workouts properly', () => {

    const MockWorkoutModel = {
      find: sinon.spy()
    }

    const workoutService = WorkoutService(MockWorkoutModel)
    workoutService.listWorkouts()
    expect(MockWorkoutModel.find.callCount).toBe(1)
  })
})