const test = require('ava')
const sinon = require('sinon')
const { getAllWorkouts } = require('../index')
const WorkoutService = require('../../../services/workout/index')

const mockReq = (sessionData, body) => ({
  session: null,
  body,
})

const mockRes = () => {
  const res = {}
  res.status = sinon.stub().returns(res)
  res.json = sinon.stub().returns(res)
  return res;
}

const mockNext = () => { }

test.beforeEach(() => {
  sinon.stub(WorkoutService, 'listWorkouts').resolves({ results: [] })
})

test.afterEach.always(() => {
  WorkoutService.listWorkouts.restore()
});

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
