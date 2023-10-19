const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { handleMongooseError } = require('../helpers');

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: 0,
      max: 10,
      required: true,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

categorySchema.post('save', handleMongooseError);

const addSchema = Joi.object({
  name: Joi.string().required(),
  color: Joi.string().required(),
  rating: Joi.number().integer().min(0).max(10).required(),
  deleted: Joi.boolean().default(false),
});

const updateRatingSchema = Joi.object({
  rating: Joi.number().integer().min(0).max(10).required(),
});

const schemas = {
  addSchema,
  updateRatingSchema,
};

const Category = model('category', categorySchema);

module.exports = {
  Category,
  schemas,
};
