const { isValidObjectId } = require('mongoose');
const { HttpError } = require('../helpers');
const isValidId = require('./isValidId');

jest.mock('mongoose');

describe('test isValidId middleware', () => {
  let mockReq;
  let mockRes;
  let mockNext;

  beforeEach(() => {
    mockReq = {
      params: {},
    };
    mockRes = {};
    mockNext = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('call next with 400 if id is not a valid ObjectId', () => {
    isValidObjectId.mockReturnValue(false);

    mockReq.params.id = 'invalidId';
    isValidId(mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalledWith(
      HttpError(400, 'invalidId is not valid id'),
    );
  });

  test('call next with 400 if categoryId is not a valid ObjectId', () => {
    isValidObjectId.mockReturnValue(false);

    mockReq.params.categoryId = 'invalidCategoryId';
    isValidId(mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalledWith(
      HttpError(400, 'invalidCategoryId is not valid id'),
    );
  });

  test('call next if id is a valid ObjectId', () => {
    isValidObjectId.mockReturnValue(true);

    mockReq.params.id = 'validId';
    isValidId(mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalled();
  });

  test('call next if categoryId is a valid ObjectId', () => {
    isValidObjectId.mockReturnValue(true);

    mockReq.params.categoryId = 'validCategoryId';
    isValidId(mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalled();
  });
});
