const mongoose = require("mongoose");
const Joi = require("joi");
const diseaseSchema = new mongoose.Schema(
  {
    diseaseName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    steps: [
      {
        type: String,
      },
    ],
    advice: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);
function validateAddDisease(obj) {
  const schema = Joi.object({
    diseaseName: Joi.string().min(3).required(),
    description: Joi.string().min(3).required(),
    image: Joi.string().required(),
    steps: Joi.array().min(3),
    advice: Joi.array(),
  });
  return schema.validate(obj);
}
const Disease = mongoose.model("Disease", diseaseSchema);
module.exports = { Disease, validateAddDisease };
