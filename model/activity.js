const mongoose = require("mongoose");
const Joi = require("joi");
const ActivitySchema = new mongoose.Schema(
  {
    activityName: {
      type: string,
      minlength: 3,
      maxlength: 50,
      required: true,
    },
    description: {
      type: string,
      minlength: 3,
      maxlength: 200,
      required: true,
    },
    repeat: {
      type: number,
      required: true,
    },
    time: {
      type: Date,
      required: true,
    },
    endtime: {
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
    activityName: Joi.string().min(3).max(50).required(),
    description: Joi.string().min(3).max(200).required(),
    time: Joi.date().required(),
  });
  return schema.validate(obj);
}
//validate update activity
function validateUpdateActivity(obj) {
  const schema = Joi.object({
    activityName: Joi.string().min(3).max(50),
    description: Joi.string().min(3).max(200),
    time: Joi.date(),
  });
  return schema.validate(obj);
}
module.exports = { Activity, validateAddActivity, validateUpdateActivity };
