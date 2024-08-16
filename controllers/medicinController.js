const asynchandler = require("express-async-handler");
const {
  Medicin,
  validateAddMedicin,
  validateUpdateMedicin,
} = require("../model/medicine");
const jwt = require("jsonwebtoken");
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
    repeat: req.body.repeat,
    EnableNotification: req.body.EnableNotification,
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
          repeat: req.body.repeat,
          EnableNotification: req.body.EnableNotification,
        },
      },
      { new: true }
    );
    return res.status(200).json(updateMedicin);
  } else {
    return res.status(404).json({ message: "this medicin is not found" });
  }
});
const getAllMedicin = asynchandler(async (req, res) => {
  // const token = req.headers.token;
  // const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  // console.log(decoded);
  const c_id = req.params.id;
  const medicins = await Medicin.find({ elderly: c_id });
  console.log(c_id);
  if (medicins) {
    return res.status(200).json(medicins);
  } else {
    return res
      .status(400)
      .json({ message: "No medicins have been added yet " });
  }
});
const getMedicinByDate = asynchandler(async (req, res) => {
  const auth = req.headers.authorization;
  const token = auth.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const c_id = decoded.id;
  const currentTime = Date.now();
  const date = new Date(currentTime);
  const medicins = await Medicin.find({ elderly: c_id });
  // const endDate = activities.endDate;
  // const homeMed = await medicins.find({ endDate: { $gt: date } });
  const homeMed = await medicins.filter(
    (medicins) => medicins.endDate != date && medicins.endDate > date
  );
  // const homeMed = await medicins.find({ endDatee: { $gte: date } });
  if (homeMed && homeMed.length > 0) {
    return res.status(200).json(homeMed);
  } else {
    return res.status(200).json({ message: "there no medicin for today" });
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
