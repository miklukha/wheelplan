const { isValidObjectId } = require('mongoose');

const { HttpError } = require('../helpers');

const isValidId = (req, res, next) => {
  const { id = '', categoryId = '' } = req.params;
  const idForCheck = id || categoryId;

  if (!isValidObjectId(idForCheck)) {
    next(HttpError(400, `${idForCheck} is not valid id`));
  }
  next();
};

module.exports = isValidId;
