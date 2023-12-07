const { HttpError } = require('../helpers');
const validateBody = require('./validateBody');

describe('validateBody middleware', () => {
  let mockReq;
  let mockRes;
  let mockNext;

  beforeEach(() => {
    mockReq = {
      body: {},
    };
    mockRes = {};
    mockNext = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('call next with HttpError(400) if schema validation fails', () => {
    const mockSchema = {
      validate: jest.fn(() => ({ error: { message: 'Validation error' } })),
    };

    const middleware = validateBody(mockSchema);
    middleware(mockReq, mockRes, mockNext);

    expect(mockSchema.validate).toHaveBeenCalledWith(mockReq.body);
    expect(mockNext).toHaveBeenCalledWith(HttpError(400, 'Validation error'));
  });

  test('call next if schema validation passes', () => {
    const mockSchema = {
      validate: jest.fn(() => ({ error: null })),
    };

    const middleware = validateBody(mockSchema);
    middleware(mockReq, mockRes, mockNext);

    expect(mockSchema.validate).toHaveBeenCalledWith(mockReq.body);
    expect(mockNext).toHaveBeenCalled();
  });
});
