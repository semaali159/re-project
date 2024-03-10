const mongoose = require("mongoose");
const Joi = require("joi");
const MedicinSchema = new mongoose.Schema(
  {
    elderly: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "elderly",
      required: true,
    },
    medicinName: {
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
      required: true,
    },
    endDate: {
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
    medicinName: Joi.string().min(3).max(30).required(),
    description: Joi.string().min(3).max(200).required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
  });
  return schema.validate(obj);
}
//validate update medicin
function validateUpdateMedicin(obj) {
  const schema = Joi.object({
    medicinName: Joi.string().min(3).max(30),
    description: Joi.string().min(3).max(200),
    startDate: Joi.date(),
    endDate: Joi.date(),
  });
  return schema.validate(obj);
}
module.exports = { Medicin, validateAddMedicin, validateUpdateMedicin };
