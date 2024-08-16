const { DailyHealth, validateAddDailyHeath } = require("../model/dailyHealth");
const { Disease } = require("../model/diseases");
const asynchandler = require("express-async-handler");
const addBloodPresureValue = asynchandler(async (req, res) => {
  const { error } = validateAddDailyHeath(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  let dailyHealth = new DailyHealth({
    disease: req.body.disease,
    elderly: req.params.id,
    value: req.body.value,
  });

  const disease_name = await Disease.findById(dailyHealth.disease).select(
    "diseaseName"
  );
  if (!disease_name) {
    return res.status(404).json({ message: "disease not found" });
  }
  if (disease_name.diseaseName == "blood pressure") {
    const val = dailyHealth.value.split(/([/])/);
    if (val[0] < 90 || val[2] < 60) {
      dailyHealth.status = "low blood pressure";
      dailyHealth.save();
      return res
        .status(201)
        .json({ message: "value added", status: dailyHealth.status });
    } else if (val[0] > 120 || val[2] > 80) {
      dailyHealth.status = "high blood pressure";
      dailyHealth.save();
      return res
        .status(201)
        .json({ message: "value added", status: dailyHealth.status });
    } else {
      dailyHealth.status = "normal";
      dailyHealth.save();
      return res
        .status(201)
        .json({ message: "value added", status: dailyHealth.status });
    }
  }
});

const addDiabetesValue = asynchandler(async (req, res) => {
  const { error } = validateAddDailyHeath(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  let dailyHealth = new DailyHealth({
    disease: req.body.disease,
    elderly: req.params.id,
    value: req.body.value,
  });

  const disease_name = await Disease.findById(dailyHealth.disease).select(
    "diseaseName"
  );
  if (!disease_name) {
    return res.status(404).json({ message: "disease not found" });
  }
  const d = disease_name.diseaseName.toString();
  if (d.toString() == "Diabetes") {
    const val = parseInt(dailyHealth.value);
    if (val < 70) {
      dailyHealth.status = "low blood sugar";
      dailyHealth.save();
      return res
        .status(201)
        .json({ message: "value added", status: dailyHealth.status });
    } else if (val > 130) {
      dailyHealth.status = "high blood sugar";
      dailyHealth.save();
      return res
        .status(201)
        .json({ message: "value added", status: dailyHealth.status });
    } else {
      dailyHealth.status = "normal";
      dailyHealth.save();
      console.log(222);
      return res
        .status(201)
        .json({ message: "value added", status: dailyHealth.status });
    }
  }
});
module.exports = { addBloodPresureValue, addDiabetesValue };
