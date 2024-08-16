const { validateAddDisease, Disease } = require("../model/diseases");
const asynchandler = require("express-async-handler");
/**
 * @desc add diseases
 * @route /api/medicin
 * @method post
 * @access puplic
 * */
const addDisease = asynchandler(async (req, res) => {
  const { error } = validateAddDisease(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const disease = new Disease({
    diseaseName: req.body.diseaseName,
    description: req.body.description,
    steps: req.body.steps,
    image: req.body.image,
    advice: req.body.advice,
    toolImage: req.body.toolImage,
  });
  await disease.save();
  return res
    .status(201)
    .json({ message: "added successfully", id: disease._id });
});
const getAllDiseases = asynchandler(async (req, res) => {
  const diseases = await Disease.find();
  if (!diseases) {
    return res.status(404).json({ message: "siseases not found" });
  }

  return res.status(200).json({ diseases });
});
const getDiseasesById = asynchandler(async (req, res) => {
  const disease = await Disease.findById(req.params.id);
  if (!disease) {
    return res.status(404).json({ message: "disease not found" });
  }

  return res.status(200).json({ disease });
});
module.exports = { addDisease, getAllDiseases, getDiseasesById };
