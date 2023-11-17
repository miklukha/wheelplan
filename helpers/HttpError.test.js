/*
 * 1. Status is an integer
 * 2. Message is optional and a string
 * 3. Return an error the appropriate status and message
 *
 * (400) - error with status 400 and message 'Bad Request'
 * (400, 'Not valid id') - error with status 400 and message 'Not valid id'
 * (401) - error with status 401 and message 'Unauthorized'
 * (401, 'User is unauthorized') - error with status 401 and message 'User is unauthorized'
 * (403) - error with status 403 and message 'Forbidden'
 * (403, 'User is unauthorized') - error with status 403 and message 'Access is forbidden'
 * (404) - error with status 404 and message 'Not found'
 * (404, 'The page is not found') - error with status 404 and message 'The page is not found'
 * (409) - error with status 409 and message 'Conflict'
 * (409, 'A conflict arose') - error with status 409 and message 'A conflict arose'
 *
 * () - error in the function 'status must be exist'
 * (409.9) - error in the function 'status must be an integer'
 * ('409') - error in the function 'status must be a number'
 * (null) - error in the function 'status must be a number'
 * (false) - error in the function 'status must be a number'
 * (true) - error in the function 'status must be a number'
 * (() => {}) - error in the function 'status must be a number'
 * ({}) - error in the function 'status must be a number'
 * ([]) - error in the function 'status must be a number'
 *
 * (400, null) - error in the function 'message must be a string'
 * (400, 12) - error in the function 'message must be a string'
 * (400, false) - error in the function 'message must be a string'
 * (400, true) - error in the function 'message must be a string'
 * (400, () => {}) - error in the function 'message must be a string'
 * (400, {}) - error in the function 'message must be a string'
 * (400, []) - error in the function 'message must be a string'
 *
 */

const HttpError = require('./HttpError');

describe('test HttpError function', () => {
  // Tests with valid status and default messages
  test("(400) - error with status 400 and message 'Bad Request'", () => {
    const error = HttpError(400);
    expect(error).toBeInstanceOf(Error);
    expect(error.status).toBe(400);
    expect(error.message).toBe('Bad Request');
  });

  test("(400, 'Not valid id') - error with status 400 and message 'Not valid id'", () => {
    const error = HttpError(400, 'Not valid id');
    expect(error).toBeInstanceOf(Error);
    expect(error.status).toBe(400);
    expect(error.message).toBe('Not valid id');
  });

  test("(401) - error with status 401 and message 'Unauthorized'", () => {
    const error = HttpError(401);
    expect(error).toBeInstanceOf(Error);
    expect(error.status).toBe(401);
    expect(error.message).toBe('Unauthorized');
  });

  test("(401, 'User is unauthorized') - error with status 401 and message 'User is unauthorized'", () => {
    const error = HttpError(401, 'User is unauthorized');
    expect(error).toBeInstanceOf(Error);
    expect(error.status).toBe(401);
    expect(error.message).toBe('User is unauthorized');
  });

  test("(403) - error with status 403 and message 'Forbidden'", () => {
    const error = HttpError(403);
    expect(error).toBeInstanceOf(Error);
    expect(error.status).toBe(403);
    expect(error.message).toBe('Forbidden');
  });

  test("(403, 'User is unauthorized') - error with status 403 and message 'Access is forbidden'", () => {
    const error = HttpError(403, 'Access is forbidden');
    expect(error).toBeInstanceOf(Error);
    expect(error.status).toBe(403);
    expect(error.message).toBe('Access is forbidden');
  });

  test("(404) - error with status 404 and message 'Not found'", () => {
    const error = HttpError(404);
    expect(error).toBeInstanceOf(Error);
    expect(error.status).toBe(404);
    expect(error.message).toBe('Not found');
  });

  test("(404, 'The page is not found') - error with status 404 and message 'The page is not found'", () => {
    const error = HttpError(404, 'The page is not found');
    expect(error).toBeInstanceOf(Error);
    expect(error.status).toBe(404);
    expect(error.message).toBe('The page is not found');
  });

  test("(409) - error with status 409 and message 'Conflict'", () => {
    const error = HttpError(409);
    expect(error).toBeInstanceOf(Error);
    expect(error.status).toBe(409);
    expect(error.message).toBe('Conflict');
  });

  test("(409, 'A conflict arose') - error with status 409 and message 'A conflict arose'", () => {
    const error = HttpError(409, 'A conflict arose');
    expect(error).toBeInstanceOf(Error);
    expect(error.status).toBe(409);
    expect(error.message).toBe('A conflict arose');
  });

  // Tests with invalid status
  test("() - error in the function 'status must be exist'", () => {
    expect(() => HttpError()).toThrow('status must be exist');
  });

  test("(409.9) - error in the function 'status must be an integer'", () => {
    expect(() => HttpError(409.9)).toThrow('status must be an integer');
  });

  test("('409') - error in the function 'status must be a number'", () => {
    expect(() => HttpError('409')).toThrow('status must be a number');
  });

  test("(null) - error in the function 'status must be a number'", () => {
    expect(() => HttpError(null)).toThrow('status must be a number');
  });

  test("(false) - error in the function 'status must be a number'", () => {
    expect(() => HttpError(false)).toThrow('status must be a number');
  });

  test("(true) - error in the function 'status must be a number'", () => {
    expect(() => HttpError(true)).toThrow('status must be a number');
  });

  test("(() => {}) - error in the function 'status must be a number'", () => {
    expect(() => HttpError(() => {})).toThrow('status must be a number');
  });

  test("({}) - error in the function 'status must be a number'", () => {
    expect(() => HttpError({})).toThrow('status must be a number');
  });

  test("([]) - error in the function 'status must be a number'", () => {
    expect(() => HttpError([])).toThrow('status must be a number');
  });

  // Tests with invalid message
  test("(400, null) - error in the function 'message must be a string'", () => {
    expect(() => HttpError(400, null)).toThrow('message must be a string');
  });

  test("(400, 12) - error in the function 'message must be a string'", () => {
    expect(() => HttpError(400, 12)).toThrow('message must be a string');
  });

  test("(400, false) - error in the function 'message must be a string'", () => {
    expect(() => HttpError(400, false)).toThrow('message must be a string');
  });

  test("(400, true) - error in the function 'message must be a string'", () => {
    expect(() => HttpError(400, true)).toThrow('message must be a string');
  });

  test("(400, () => {}) - error in the function 'message must be a string'", () => {
    expect(() => HttpError(400, () => {})).toThrow('message must be a string');
  });

  test("(400, {}) - error in the function 'message must be a string'", () => {
    expect(() => HttpError(400, {})).toThrow('message must be a string');
  });

  test("(400, []) - error in the function 'message must be a string'", () => {
    expect(() => HttpError(400, [])).toThrow('message must be a string');
  });
});
