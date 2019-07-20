const test = require('ava')
const sinon = require('sinon').sandbox.create()
const { register } = require('../index')

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

test('register should return 400 w/ missing username', async (t) => {
  const req = mockReq(
    {}, // Empty session data when registering
    { password: 'test', passwordDuplicate: 'test' }) // Submitted body
  const res = mockRes()
  const next = mockNext()
  console.log('request data', req)
  await register(req, res, null)

  const responseStatus400 = res.status.calledWith(400)
  const missingParameterMessage = res.json.calledWith({ message: 'username or password missing' })
  t.true(responseStatus400)
  t.true(missingParameterMessage)
})