const mongoose = require("mongoose");
const Joi = require("joi");
const dailyHealthSchema = new mongoose.Schema(
  {
    disease: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "diseases",
      required: true,
    },
    elderly: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "elderly",
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: [
        "low blood pressure",
        "high blood pressure",
        "normal",
        "low blood sugar",
        "high blood sugar",
      ],
    },
  },
  { timestamps: true }
);

const DailyHealth = mongoose.model("DailyHealth", dailyHealthSchema);
function validateAddDailyHeath(obj) {
  const schema = Joi.object({
    disease: Joi.string().min(3).required(),
    elderly: Joi.string().min(3),
    value: Joi.string(),
    status: Joi.string(),
  });
  return schema.validate(obj);
}
module.exports = { DailyHealth, validateAddDailyHeath };
