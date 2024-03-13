const asynchandler = require("express-async-handler");
const {
  Medicin,
  validateAddMedicin,
  validateUpdateMedicin,
} = require("../model/medicine");
/**
 * @desc get all medicins
 * @route /api/medicin
 * @method get
 * @access puplic
 * */ 
const getAllMedicin = asynchandler(async (req, res) => {
  const token = req.headers.token;
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  console.log(decoded);
  const c_id = decoded.id;
  const medicins = await Medicin.find({ elderly: c_id });
  console.log(c_id);
  if (medicins) {
    return res.status(200).json(medicins);
  } else {
    return res
      .status(400)
      .json({ message: "No medications have been added yet " });
  }
});  
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
    endDate: req.body.endDate,
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
  const updateMedicin = await Medicin.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        medicinName: req.body.medicinName,
        description: req.body.description,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
      },
    },
    { new: true }
  );
  res.status(200).json(updateMedicin);
});
const deleteMedicin = asynchandler(async (req, res) => {
  const medicin = await Medicin.findById(req.params.id);
  if (medicin) {
    await Medicin.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "medicin has been deleted" });
  } else {
    res.status(404).json({ message: "medicin not found" });
  }
});
module.exports = { addMedicin,getAllMedicin, updatemedicin, deleteMedicin };
