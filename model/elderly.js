const Joi = require("joi");
const { number, array } = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const passwordComplexity = require("joi-password-complexity");
const elderlySchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 100,
      unique: true,
    },
    firstname: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 200,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 200,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
    },
    phnumber: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    age: {
      type: Number,
      min: 30,
      max: 100,
      required: true,
    },
    diseases: {
      type: Array,
    },
    image: {
      type: String,
      default: "default-avatar.png",
    },
    otpnum: {
      type: Number,
      default: 0,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    fcmToken: {
      type: [String],
    },
    repeat: {
      type: Number,
    },
  },
  { timestamps: true }
);
elderlySchema.methods.generateToken = function () {
  return jwt.sign(
    { id: this._id, isAdmin: this.isAdmin },
    process.env.JWT_SECRET_KEY
  );
};
const Elderly = mongoose.model("Elderly", elderlySchema);
//validate register user
function validateRegister(obj) {
  const schema = Joi.object({
    email: Joi.string().trim().min(5).max(100).required().email(),
    firstname: Joi.string().trim().min(3).max(200).required(),
    lastname: Joi.string().trim().min(3).max(200).required(),
    password: passwordComplexity().required(),
    phnumber: Joi.number(),
    age: Joi.number(),
    diseases: Joi.array().items(Joi.string()),
    otpnum: Joi.number(),
    verified: Joi.boolean(),
    repeat: Joi.number(),
    fcmToken: Joi.string().required(),
  });
  return schema.validate(obj);
}
//validate login user
function validateLogin(obj) {
  const schema = Joi.object({
    email: Joi.string().trim().min(5).max(100).required().email(),
    password: Joi.string().trim().min(6).required(),
    fcmToken: Joi.string().required(),
  });
  return schema.validate(obj);
}
//validate update user
function validateUpdate(obj) {
  const schema = Joi.object({
    firstname: Joi.string().trim().min(5).max(200),
    lastname: Joi.string().trim().min(5).max(200),
    age: Joi.number(),
    diseases: Joi.array().items(Joi.string()),
  });
  return schema.validate(obj);
}
function validateVerify(obj) {
  const schema = Joi.object({
    email: Joi.string().trim().min(5).max(100).required().email(),
    otpnum: Joi.number(),
  });
  return schema.validate(obj);
}
module.exports = {
  Elderly,
  validateLogin,
  validateRegister,
  validateUpdate,
  validateVerify,
};
