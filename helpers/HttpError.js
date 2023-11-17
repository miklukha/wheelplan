const errorMessageList = {
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not found',
  409: 'Conflict',
};

const HttpError = (status, message = errorMessageList[status]) => {
  console.log(message);
  if (status === undefined) {
    throw new Error('status must be exist');
  }

  if (typeof status !== 'number') {
    throw new Error('status must be a number');
  }

  if (!Number.isInteger(status)) {
    throw new Error('status must be an integer');
  }

  if (typeof message !== 'string') {
    throw new Error('message must be a string');
  }

  const error = new Error(message);
  error.status = status;
  return error;
};

module.exports = HttpError;
