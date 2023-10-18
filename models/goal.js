const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { handleMongooseError } = require('../helpers');

const dateRegexp = /^\d{2}-\d{2}-\d{4}$/;

const subGoalSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  progress: {
    type: Number,
  },
  deadline: {
    type: String,
    match: dateRegexp,
  },
  habitStart: {
    type: String,
    match: dateRegexp,
  },
});

const goalSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    habitStart: {
      type: String,
      // 16-10-2009
      match: dateRegexp,
    },
    deadline: {
      type: String,
      // 16-10-2009
      match: dateRegexp,
    },
    progress: {
      type: Number,
    },
    value: {
      type: Number,
      min: 0,
      max: 10,
      required: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    subGoals: [subGoalSchema],
    // category: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'category',
    //   required: true,
    // },
    // owner: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'user',
    //   required: true,
    // },
  },
  { versionKey: false, timestamps: true },
);

goalSchema.post('save', handleMongooseError);

const addSubGoalSchema = Joi.object({
  title: Joi.string().required(),
  progress: Joi.number().integer(),
  deadline: Joi.string().pattern(dateRegexp),
  habitStart: Joi.string().pattern(dateRegexp),
});

const addSchema = Joi.object({
  title: Joi.string().required(),
  habitStart: Joi.string().pattern(dateRegexp),
  deadline: Joi.string().pattern(dateRegexp),
  progress: Joi.number().integer(),
  value: Joi.number().integer().min(0).max(10).required(),
  status: Joi.boolean().default(false),
  deleted: Joi.boolean().default(false),
  subGoals: Joi.array().items(addSubGoalSchema),
});

const updateProgressSchema = Joi.object({
  progress: Joi.number().integer().required(),
});

const updateStatusSchema = Joi.object({
  status: Joi.boolean().required(),
});

const schemas = {
  addSchema,
  addSubGoalSchema,
  updateProgressSchema,
  updateStatusSchema,
};

const Goal = model('goal', goalSchema);

module.exports = {
  Goal,
  schemas,
};
