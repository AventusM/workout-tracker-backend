const test = require('ava')
const sinon = require('sinon').sandbox.create()
const { logout } = require('../index')

const mockReq = (sessionData, body) => ({
  session: { data: sessionData },
  body,
})

const mockRes = () => {
  const res = {}
  res.status = sinon.stub().returns(res)
  res.json = sinon.stub().returns(res)
  return res
}

const mockNext = () => { }

test.beforeEach(() => {
})

test.afterEach.always(() => {
  sinon.restore()
})

test('logout should return 204 w/ request data', async (t) => {
  const req = mockReq(
    { user: 'TEST_MOCK_DATA' }, // Existing session data when logging out
    {}) // Empty body
  const res = mockRes()
  const next = mockNext()
  await logout(req, res)

  const responseStatus204 = res.status.calledWith(204)
  const sessionDestroyed = req.session === null
  t.true(responseStatus204)
  t.true(sessionDestroyed)
})