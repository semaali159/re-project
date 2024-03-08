const mongoose = require("mongoose");
const Joi = require("joi");
const MedicinSchema = new mongoose.Schema(
  {
    medicinName: {
      type: string,
      minlength: 3,
      maxlength: 30,
      required: true,
    },
    description: {
      type: string,
      minlength: 3,
      maxlength: 200,
      required: true,
    },
    repeat: {
      type: string,
      enum: ["daily", "weekly", "per mounth"],
      required: true,
    },
    time: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Medicin = mongoose.model("Medicin", MedicinSchema);
//validate add medicin
function validateAddMedicin(obj) {
  const schema = Joi.object({
    medicinname: Joi.string().min(3).max(30).required(),
    description: Joi.string().min(3).max(200).required(),
    time: Joi.date().required(),
  });
  return schema.validate(obj);
}
//validate update medicin
function validateUpdateMedicin(obj) {
  const schema = Joi.object({
    medicintname: Joi.string().min(3).max(30),
    description: Joi.string().min(3).max(200),
    time: Joi.date(),
  });
  return schema.validate(obj);
}
module.exports = { Medicin, validateAddMedicin, validateUpdateMedicin };
