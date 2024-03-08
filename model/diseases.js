const mongoose = require("mongoose");
const Joi = require("joi");
const diseasesSchema = new mongoose.Schema(
  {
    diseasesName: {
      type: string,
      required: true,
    },
    description: {
      type: string,
      required: true,
    },
  },
  { timestamps: true }
);

const Diseases = mongoose.model("Diseases", diseasesSchema);
module.exports = { Diseases };
