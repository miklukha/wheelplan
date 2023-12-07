const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const { HttpError } = require('../helpers');
const authenticate = require('./authenticate');

process.env.SECRET_KEY =
  'qH4QYDPBLPdp8KAOoKp0VNMKshyDLyfCKguBAgLnUH8rKjq3fRrsW2x3nk2K41h';

jest.mock('jsonwebtoken');
jest.mock('../models/user');

describe('test authenticate middleware', () => {
  let mockReq;
  let mockRes;
  let mockNext;

  beforeEach(() => {
    mockReq = {
      headers: {},
    };
    mockRes = {};
    mockNext = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('call next with 401 if authorization header is missing', async () => {
    await authenticate(mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalledWith(HttpError(401));
  });

  test('call next with 401 if authorization header does not start with "Bearer"', async () => {
    mockReq.headers.authorization = 'InvalidToken';

    await authenticate(mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalledWith(HttpError(401));
  });

  test('call next with 401 if jwt.verify throws an error', async () => {
    mockReq.headers.authorization = 'Bearer invalidToken';
    jwt.verify.mockImplementation(() => {
      throw new Error('Verification error');
    });

    await authenticate(mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalledWith(HttpError(401));
  });

  test('call next with 401 if user is not found or token is invalid', async () => {
    mockReq.headers.authorization = 'Bearer validToken';
    jwt.verify.mockReturnValue({ id: 'userId' });

    User.findById.mockReturnValue(null);

    await authenticate(mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalledWith(HttpError(401));

    User.findById.mockReturnValue({ _id: 'userId', token: 'invalidToken' });

    await authenticate(mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalledWith(HttpError(401));
  });

  test('set req.user and call next on successful authentication', async () => {
    const user = { _id: 'userId', token: 'validToken' };
    mockReq.headers.authorization = 'Bearer validToken';
    jwt.verify.mockReturnValue({ id: 'userId' });
    User.findById.mockReturnValue(user);

    await authenticate(mockReq, mockRes, mockNext);

    expect(mockReq.user).toEqual(user);
    expect(mockNext).toHaveBeenCalled();
  });
});
