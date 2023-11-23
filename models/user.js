const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { handleMongooseError } = require('../helpers');

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: emailRegexp,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: true,
    },
    token: {
      type: String,
      default: '',
    },
    totalRanking: {
      type: Number,
      default: 0,
      min: 0,
      max: 10,
    },
  },
  { versionKey: false, timestamps: true },
);

userSchema.post('save', handleMongooseError);

const registerSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  username: Joi.string(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const totalRankingSchema = Joi.object({
  totalRanking: Joi.number().integer().min(0).max(10),
});

const schemas = {
  registerSchema,
  loginSchema,
  totalRankingSchema,
};

const User = model('user', userSchema);

module.exports = {
  User,
  schemas,
};
