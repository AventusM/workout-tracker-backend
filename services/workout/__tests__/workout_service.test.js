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
    let results

    // Arrow function does not work here?
    const MockWorkoutModel = function (data) {
      results = data.results
      return {
        ...data,
        save
      }
    }

    const workoutService = WorkoutService(MockWorkoutModel)
    const customWorkout = [{
      name: 'Bench press',
      type: 'Machine',
      weight: 85,
      repetitions: 1,
      sets: 1
    }]

    // parameter works as data for MockWorkoutModel
    workoutService.createWorkout(customWorkout)

    // NOTICE DIFFERENCE COMPARED TO listWorkouts!
    expect(save.callCount).toBe(1)
    expect(results[0].name).toEqual('Bench press')
    expect(results[0].type).toEqual('Machine')
    expect(results[0].weight).toEqual(85)
    expect(results[0].repetitions).toEqual(1)
    expect(results[0].sets).toEqual(1)
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