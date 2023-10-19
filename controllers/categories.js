const { Category } = require('../models/category');
const { HttpError, ctrlWrapper } = require('../helpers');

const getAll = async (req, res) => {
  const { _id: owner } = req.user;

  const result = await Category.find({ deleted: false, owner });
  res.json(result);
};

const getById = async (req, res) => {
  // const { _id: owner } = req.user;
  const { id } = req.params;

  // const result = await Category.find({ _id: id, owner });
  const result = await Category.findById(id);

  if (!result) {
    throw HttpError(404, 'Not found');
  }

  res.json(result);
};

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Category.create({ ...req.body, owner });

  res.status(201).json(result);
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const result = await Category.findByIdAndUpdate(id, req.body, { new: true });

  if (!result) {
    throw HttpError(404, 'Not found');
  }

  res.json(result);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const result = await Category.findByIdAndUpdate(
    id,
    { ...req.body, deleted: true },
    { new: true },
  );

  if (!result) {
    throw HttpError(404, 'Not found');
  }

  res.json(result);
};

const updateRating = async (req, res) => {
  const { id } = req.params;
  const result = await Category.findByIdAndUpdate(id, req.body, { new: true });

  if (!result) {
    throw HttpError(404, 'Not found');
  }

  res.json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
  updateRating: ctrlWrapper(updateRating),
};
