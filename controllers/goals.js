const { Types } = require('mongoose');
const { Goal } = require('../models/goal');
const { HttpError, ctrlWrapper } = require('../helpers');

const getAll = async (req, res) => {
  const { _id: owner } = req.user;

  const result = await Goal.find({ deleted: false, owner }).sort( { "status": 1 } );
  res.json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Goal.findById(id);

  if (!result) {
    throw HttpError(404, 'Not found');
  }

  res.json(result);
};

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const categoryId = new Types.ObjectId(req.body.category);

  const result = await Goal.create({
    ...req.body,
    owner,
    category: categoryId,
  });

  res.status(201).json(result);
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const result = await Goal.findByIdAndUpdate(id, req.body, { new: true });

  if (!result) {
    throw HttpError(404, 'Not found');
  }

  res.json(result);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const result = await Goal.findByIdAndUpdate(
    id,
    { ...req.body, deleted: true },
    { new: true },
  );

  if (!result) {
    throw HttpError(404, 'Not found');
  }

  res.json(result);
};

const updateStatus = async (req, res) => {
  const { id } = req.params;
  const result = await Goal.findByIdAndUpdate(id, req.body, { new: true });

  if (!result) {
    throw HttpError(404, 'Not found');
  }

  res.json(result);
};

const updateProgress = async (req, res) => {
  const { id } = req.params;
  const result = await Goal.findByIdAndUpdate(id, req.body, { new: true });

  if (!result) {
    throw HttpError(404, 'Not found');
  }

  res.json(result);
};

const getAllByCategory = async (req, res) => {
  const { categoryId } = req.params;

  const result = await Goal.find({ category: categoryId, deleted: false });
  res.json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
  updateStatus: ctrlWrapper(updateStatus),
  updateProgress: ctrlWrapper(updateProgress),
  getAllByCategory: ctrlWrapper(getAllByCategory),
};
