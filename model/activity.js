const mongoose = require("mongoose");
const Joi = require("joi");
const ActivitySchema = new mongoose.Schema(
  {
    elderly: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "elderly",
      required: true,
    },
    activityName: {
      type: String,
      minlength: 3,
      maxlength: 30,
      required: true,
    },
    description: {
      type: String,
      minlength: 3,
      maxlength: 200,
      required: true,
    },
    startDate: {
      type: Date,
      required: false,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Activity = mongoose.model("Activity", ActivitySchema);
//validate add activity
function validateAddActivity(obj) {
  const schema = Joi.object({
    activityName: Joi.string().min(3).max(30).required(),
    description: Joi.string().min(3).max(200).required(),
    startDate: Joi.date(),
    endDate: Joi.date().required(),
  });
  return schema.validate(obj);
}
//validate update activity
function validateUpdateActivity(obj) {
  const schema = Joi.object({
    activityName: Joi.string().min(3).max(30),
    description: Joi.string().min(3).max(200),
    startDate: Joi.date(),
    endDate: Joi.date(),
  });
  return schema.validate(obj);
}
module.exports = { Activity, validateAddActivity, validateUpdateActivity };
