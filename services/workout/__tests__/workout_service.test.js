const WorkoutService = require('../workout_service')
const sinon = require('sinon')

describe('WorkoutService test', () => {
  it('Service is defined', () => {
    expect(WorkoutService).toBeDefined()
  })
})

describe('listWorkouts test', () => {
  it('lists workouts properly', () => {
    const find = sinon.spy()

    const MockWorkoutModel = {
      find: find
    }

    const workoutService = WorkoutService(MockWorkoutModel)
    workoutService.listWorkouts()
    expect(MockWorkoutModel.find.callCount).toBe(1)
  })
})

describe('createWorkout test', () => {
  it('succesfully creates a workout with valid data', () => {
    const save = sinon.spy()
    let content

    // Arrow function does not work here?
    const MockWorkoutModel = function (data) {
      content = data.content
      // console.log('given content', content)
      return {
        ...data,
        save
      }
    }

    const workoutService = WorkoutService(MockWorkoutModel)

    // parameter works as data for MockWorkoutModel
    workoutService.createWorkout('overhead press 5x55kg')

    // NOTICE DIFFERENCE COMPARED TO listWorkouts!
    expect(save.callCount).toBe(1)
    expect(content).toEqual('overhead press 5x55kg')
  })
})

describe('updateWorkout test', () => {
  it.skip('updates a workout with valid id', () => {
  })
})

describe('deleteWorkout test', () => {
  it.skip('deletes a workout with valid id', () => {
  })
})