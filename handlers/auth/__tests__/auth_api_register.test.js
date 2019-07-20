const test = require('ava')
const sinon = require('sinon').sandbox.create()
const { register } = require('../index')
const AuthService = require('../../../services/auth/index')

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
  sinon.stub(AuthService, 'registerNewUser').resolves({})
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
  await register(req, res, null)

  const responseStatus400 = res.status.calledWith(400)
  const missingParameterMessage = res.json.calledWith({ message: 'username or password missing' })
  t.true(responseStatus400)
  t.true(missingParameterMessage)
})

test('register should return 400 w/ password + passwordDuplicate mismatch', async (t) => {
  const req = mockReq(
    {}, // Empty session data when registering
    { username: 'testUser#1', password: 'test', passwordDuplicate: 'NOTPASSWORD' }) // Submitted body
  const res = mockRes()
  const next = mockNext()
  await register(req, res, null)

  const responseStatus400 = res.status.calledWith(400)
  const parameterMismatchMessage = res.json.calledWith({ message: 'password and password confirmation do not match' })
  t.true(responseStatus400)
  t.true(parameterMismatchMessage)
})

test('register should return 200 when given valid data', async (t) => {
  const req = mockReq(
    {}, // Empty session data when registering
    { username: 'testUser#2', password: 'test', passwordDuplicate: 'test' }) // Submitted body
  const res = mockRes()
  const next = mockNext()
  await register(req, res, null)

  const responseStatus200 = res.status.calledWith(200)
  t.true(responseStatus200)
})