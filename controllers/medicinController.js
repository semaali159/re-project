const asynchandler = require("express-async-handler");
const {
  Medicin,
  validateAddMedicin,
  validateUpdateMedicin,
} = require("../model/medicine");
const calculateReminderTimes = require("../utils/calReminder");
const jwt = require("jsonwebtoken");
var cron = require("node-cron");
/**
 * @desc add medicin
 * @route /api/medicin
 * @method post
 * @access puplic
 * */
// const currentTime = Date.now();
// const date = new Date(currentTime);
// const options = { weekday: "long" };
// const dayOfWeekName = date.toLocaleString("en-US", options);
// console.log(dayOfWeekName);
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
    repeat: req.body.repeat,
    EnableNotification: req.body.EnableNotification,
  });
  await medicin.save();
  const reminderTime = calculateReminderTimes(
    medicin.createdAt,
    medicin.endDate,
    medicin.repeat
  );
  medicin.reminderTimes = reminderTime;
  const result = await medicin.save();
  // Convert result to an object and remove reminderTimes
  const response = result.toObject();
  delete response.reminderTimes;

  return res.status(201).json(response);
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
  const id = await Medicin.findById(req.params.id).select("elderly");
  if (!(req.user.id == id.elderly.toString())) {
    return res.status(401).json({ message: "not allowed" });
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
    await updateMedicin.save();
    let reminderTime;
    if (req.body.endDate || req.body.repeat) {
      reminderTime = calculateReminderTimes(
        updateMedicin.createdAt,
        updateMedicin.endDate,
        updateMedicin.repeat
      );
    }
    updateMedicin.reminderTimes = reminderTime;
    const result = await updateMedicin.save();
    const response = result.toObject();
    delete response.reminderTimes;

    return res.status(200).json(response);
  } else {
    return res.status(404).json({ message: "this medicin is not found" });
  }
});
const getAllMedicin = asynchandler(async (req, res) => {
  const c_id = req.params.id;
  const medicins = await Medicin.find({ elderly: c_id }).select(
    "-reminderTimes"
  );
  console.log(c_id);

  if (medicins) {
    // const response = result.toObject();
    // delete response.reminderTimes;
    return res.status(200).json(medicins);
  } else {
    return res
      .status(404)
      .json({ message: "No medicins have been added yet " });
  }
});
const getMedicinByDate = asynchandler(async (req, res) => {
  const authToken = req.headers.authorization;
  const token = authToken.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const c_id = decoded.id;
  const currentTime = Date.now();
  const date = new Date(currentTime);
  //console.log(date.format("dddd"));
  const medicins = await Medicin.find({ elderly: c_id }).select(
    "-reminderTimes"
  );
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
  const id = await Medicin.findById(req.params.id).select("elderly");
  if (!(req.user.id == id.elderly.toString())) {
    return res
      .status(401)
      .json({ message: "not not allowed, only user himself" });
  }
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
