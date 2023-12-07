const ctrlWrapper = require('./ctrlWrapper');

describe('test ctrlWrapper function', () => {
  test('call ctrl and pass control to next middleware on success', async () => {
    const mockCtrl = jest.fn().mockResolvedValue('Success');
    const mockReq = {};
    const mockRes = {};
    const mockNext = jest.fn();

    const wrappedCtrl = ctrlWrapper(mockCtrl);
    await wrappedCtrl(mockReq, mockRes, mockNext);

    expect(mockCtrl).toHaveBeenCalledWith(mockReq, mockRes, mockNext);
    expect(mockNext).not.toHaveBeenCalled();
  });

  test('call next with error if ctrl throws an error', async () => {
    const mockCtrl = jest.fn().mockRejectedValue(new Error('Some error'));
    const mockReq = {};
    const mockRes = {};
    const mockNext = jest.fn();

    const wrappedCtrl = ctrlWrapper(mockCtrl);
    await wrappedCtrl(mockReq, mockRes, mockNext);

    expect(mockCtrl).toHaveBeenCalledWith(mockReq, mockRes, mockNext);
    expect(mockNext).toHaveBeenCalledWith(new Error('Some error'));
  });
});
