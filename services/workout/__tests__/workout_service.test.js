const WorkoutService = require('../workout_service')
const Workout = require('../../../models/workout')
const Result = require('../../../models/result')
const sinon = require('sinon')
const rewire = require('rewire')
const save_test_path = rewire('../workout_service')

describe('WorkoutService test', () => {
  it('Service is defined', () => {
    expect(WorkoutService).toBeDefined()
  })
})

describe('listWorkouts test', () => {
  let find

  afterEach(() => {
    find.restore()
  })

  it('calls mongoose find method when listing workouts', () => {
    // Chained promises with sinon 
    // https://github.com/bendrucker/sinon-as-promised/issues/1#issuecomment-50288769
    find = sinon
      .stub(Workout, 'find')
      .returns(({ populate: sinon.stub() }))

    const MockWorkoutModel = {
      find
    }

    const workoutService = WorkoutService(MockWorkoutModel)
    workoutService.listWorkouts()
    expect(MockWorkoutModel.find.callCount).toBe(1)
  })
})

describe('createWorkout test', () => {
  it('calls mongoose save method when creating a workout', () => {
    save_test_path.__set__('Result', sinon.stub().returns({ message: 'ollaan täällä!' }));
    let results
    const customResults = [{
      name: 'Bench press',
      type: 'Machine',
      weight: 85,
      repetitions: 1,
      sets: 1
    }]

    const save = sinon.spy()
    const insertMany = sinon.spy()

    // Arrow function does not work here?
    const MockWorkoutModel = function (data) {
      results = data.results
      return {
        ...data,
        save
      }
    }

    const MockResultModel = function () {
      return {
        insertMany
      }
    }

    const workoutService = WorkoutService(MockWorkoutModel, MockResultModel)



    // parameter works as data for MockWorkoutModel
    workoutService.createWorkout(customResults)
    console.log('results', results)

    // NOTICE DIFFERENCE COMPARED TO listWorkouts!
    expect(save.callCount).toBe(1)
    expect(insertMany.callCount).toBe(1)
    // expect(results[0].name).toEqual('Bench press')
    // expect(results[0].type).toEqual('Machine')
    // expect(results[0].weight).toEqual(85)
    // expect(results[0].repetitions).toEqual(1)
    // expect(results[0].sets).toEqual(1)
  })
})

describe('updateWorkout test', () => {
  it.skip('updates a workout with valid id', () => {
  })
})

describe('deleteWorkout test', () => {
  it.skip('calls mongoose delete method when deleting a workout', () => {
  })
})