const test = require('ava')
const sinon = require('sinon').sandbox.create()
const { get_current_user } = require('../index')

const mockReq = (userData, body) => ({
  user: userData,
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


test('get_current_user should return 200 w/ user in request', async (t) => {
  const req = mockReq({ username: 'testCurrentUser#1' })
  const res = mockRes()
  const next = mockNext()

  await get_current_user(req, res, next)

  const responseStatus200 = res.status.calledWith(200)
  const responseContainsUser = res.json.calledWith({ username: 'testCurrentUser#1' })
  const responseContainsNotCalledUser = res.json.calledWith({ username: 'NOT_REQUEST_USER' })

  t.true(responseStatus200)
  t.true(responseContainsUser)
  t.false(responseContainsNotCalledUser)
})

test('get_current_user should return 401 w/o user in request', async (t) => {
  const req = mockReq()
  const res = mockRes()
  const next = mockNext()

  await get_current_user(req, res, next)

  const responseStatus401 = res.status.calledWith(401)
  const notLoggedInMessage = res.json.calledWith({ message: 'you are not logged in' })

  t.true(responseStatus401)
  t.true(notLoggedInMessage)
})