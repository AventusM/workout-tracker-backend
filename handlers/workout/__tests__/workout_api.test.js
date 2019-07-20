const test = require('ava')
// allows for quick sinon.restore() instead of restoring other things 1 by 1
const sinon = require('sinon').sandbox.create()
const { getAllWorkouts, createNewWorkout } = require('../index')
const WorkoutService = require('../../../services/workout/index')

const mockReq = (sessionData, body) => ({
  session: null,
  body,
})

const mockRes = () => {
  const res = {}
  // Stubbing like this allows for chaining res.status(NUMBER).json(OBJECT) ...
  res.status = sinon.stub().returns(res)
  res.json = sinon.stub().returns(res)
  return res
}

const mockNext = () => { }

test.beforeEach(() => {
  // Currently this (integration) test doesn't care for what this promise resolves into
  // Only the status code
  sinon.stub(WorkoutService, 'listWorkouts').resolves({ results: [] })
  sinon.stub(WorkoutService, 'createWorkout').resolves({})
})

// Required --serial flag to package.json so restoring would work
// Instead of complaining about listWorkouts method being wrapped in all but 1 test
test.afterEach.always(() => {
  sinon.restore()
})

test('workout api should return 200 w/ GET', async (t) => {
  const req = mockReq()
  const res = mockRes()
  const next = mockNext()
  await getAllWorkouts(req, res, next)

  const responseStatus200 = res.status.calledWith(200)
  const returnsCorrectJSON = res.json.calledWith({ results: [] })
  t.true(responseStatus200)
  t.true(returnsCorrectJSON)
})

test('workout api should return 200 w/ POST with VALID data + (TODO and valid user)', async (t) => {
  const req = mockReq(null, { results: [] })
  const res = mockRes()
  const next = mockNext()

  await createNewWorkout(req, res, null)

  const responseStatus200 = res.status.calledWith(200)
  const returnsCorrectJSON = res.json.calledWith({})
  t.true(responseStatus200)
  t.true(returnsCorrectJSON)
})

test('workout api should return 400 w/ POST with INVALID data and VALID user', async (t) => {
  t.true(true)
})

test('workout api should return 401 w/ POST with INVALID user', async (t) => {
  t.true(true)
})
