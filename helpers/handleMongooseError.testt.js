const handleMongooseError = require('./handleMongooseError');

describe('test handleMongooseError function', () => {
  test("({ name: 'MongoServerError', code: 1100}) - error with status 409 and code 11000", () => {
    const error = {
      name: 'MongoServerError',
      code: 11000,
    };
    const next = jest.fn();

    handleMongooseError(error, null, next);

    expect(error.status).toBe(409);
    expect(next).toHaveBeenCalledTimes(1);
  });

  test("({ name: 'MongoServerError', code: 12345}) - error with status 400 - for other errors", () => {
    const error = {
      name: 'MongoServerError',
      code: 12345, // not 11000
    };
    const next = jest.fn();

    handleMongooseError(error, null, next);

    expect(error.status).toBe(400);
    expect(next).toHaveBeenCalledTimes(1);
  });
});
