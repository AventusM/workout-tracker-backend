const mockReq = (sessionData, body) => ({
  session: null,
  body,
});

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const { getAllWorkouts } = require('../index')
describe('workout api', () => {

  it('should return 200 w/ GET', async () => {
    const req = mockReq()
    const res = mockRes()

    await getAllWorkouts(req, res)
    expect(res.status).toHaveBeenCalledWith(200);
  })
})
