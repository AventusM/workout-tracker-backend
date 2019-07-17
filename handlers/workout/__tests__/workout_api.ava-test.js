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

test('workout api should return 200 w/ GET', async (t) => {
  sinon.stub(WorkoutService, 'listWorkouts').resolves({})
  const req = mockReq()
  const res = mockRes()
  await getAllWorkouts(req, res)
  t.true(res.status.calledWith(200))
})
