const asynchandler = require("express-async-handler");
const {
  Medicin,
  validateAddMedicin,
  validateUpdateMedicin,
} = require("../model/medicine");
/**
 * @desc add medicin
 * @route /api/medicin
 * @method post
 * @access puplic
 * */
const addMedicin = asynchandler(async (req, res) => {
  const { error } = validateAddMedicin(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const medicin = new Medicin({
    medicinName: req.body.medicinName,
    description: req.body.description,
    startDate: req.body.startDate,
    endDate: Date.parse(req.body.endDate),
    elderly: req.user.id,
  });
  const result = await medicin.save();
  return res.status(201).json(result);
});
/**
 * @desc update medicin
 * @route /api/medicin
 * @method put
 * @access puplic
 * */
const updatemedicin = asynchandler(async (req, res) => {
  const { error } = validateUpdateMedicin(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const updmedicin = await Medicin.findById(req.params.id);
  if (updmedicin) {
    let previousEndDate = updmedicin.endDate;
    const updateMedicin = await Medicin.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          medicinName: req.body.medicinName,
          description: req.body.description,
          startDate: req.body.startDate,
          endDate: req.body.endDate
            ? Date.parse(req.body.endDate)
            : previousEndDate,
        },
      },
      { new: true }
    );
    return res.status(200).json(updateMedicin);
  } else {
    return res.status(404).json({ message: "this medicin is not found" });
  }
});
const deleteMedicin = asynchandler(async (req, res) => {
  const medicin = await Medicin.findById(req.params.id);
  if (medicin) {
    await Medicin.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "medicin has been deleted" });
  } else {
    return res.status(404).json({ message: "medicin not found" });
  }
});
module.exports = {
  addMedicin,
  getAllMedicin,
  updatemedicin,
  deleteMedicin,
  getMedicinByDate,
};
