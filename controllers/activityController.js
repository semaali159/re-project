const asynchandler = require("express-async-handler");
const {
  Activity,
  validateAddActivity,
  validateUpdateActivity,
} = require("../model/activity");
const jwt = require("jsonwebtoken");
const calculateReminderTimes = require("../utils/calReminder");
const getAllActivity = asynchandler(async (req, res) => {
  // const token = req.headers.token;
  // const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  // console.log(decoded);
  const c_id = req.params.id;
  const activities = await Activity.find({ elderly: c_id }).select(
    "elderly medicinName description"
  );
  console.log(c_id);
  if (activities) {
    return res.status(200).json(activities);
  } else {
    return res
      .status(400)
      .json({ message: "No activities have been added yet " });
  }
});
const addActivity = asynchandler(async (req, res) => {
  const { error } = validateAddActivity(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const activity = new Activity({
    activityName: req.body.activityName,
    description: req.body.description,
    startDate: req.body.startDate,
    endDate: Date.parse(req.body.endDate),
    elderly: req.user.id,
    repeat: req.body.repeat,
    EnableNotification: req.body.EnableNotification,
  });
  await activity.save();
  const reminderTime = calculateReminderTimes(
    activity.createdAt,
    activity.endDate,
    activity.repeat
  );
  activity.reminderTimes = reminderTime;
  const result = await activity.save();
  // Convert result to an object and remove reminderTimes
  const response = result.toObject();
  delete response.reminderTimes;

  return res.status(201).json(response);
});
/**
 * @desc get medicin for home
 * @route /api/medicin
 * @method get
 * @access puplic
 * */
const getActivityByDate = asynchandler(async (req, res) => {
  const authToken = req.headers.authorization;
  const token = authToken.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const c_id = decoded.id;
  const currentTime = Date.now();
  const date = new Date(currentTime);
  const activities = await Activity.find({ elderly: c_id }).select(
    "elderly medicinName description endDate"
  );
  const endDate = activities.endDate;
  // const homeMed = await medicins.find({ endDate: { $gt: date } });
  const homeAct = await activities.filter(
    (activities) => activities.endDate != date && activities.endDate > date
  );
  // const homeMed = await medicins.find({ endDatee: { $gte: date } });
  if (homeAct && homeAct.length > 0) {
    return res.status(200).json(homeAct);
  } else {
    return res.status(200).json({ message: "there no activity for today" });
  }
});
/**
 * @desc update activity
 * @route /api/activity
 * @method put
 * @access private (only user)
 * */
const updateActivity = asynchandler(async (req, res) => {
  const { error } = validateUpdateActivity(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const id = await Activity.findById(req.params.id).select("elderly");
  if (!(req.user.id == id.elderly.toString())) {
    return res
      .status(401)
      .json({ message: "not not allowed, only user himself" });
  }
  const updactivity = await Activity.findById(req.params.id);
  if (updactivity) {
    let previousEndDate = updactivity.endDate;
    const updateActivity = await Activity.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          activityName: req.body.activityName,
          description: req.body.description,
          startDate: req.body.startDate,
          endDate: req.body.endDate
            ? Date.parse(req.body.endDate)
            : previousEndDate,
          repeat: req.body.repeat,
        },
      },
      { new: true }
    );
    await updateActivity.save();
    let reminderTime;
    if (req.body.endDate || req.body.repeat) {
      reminderTime = calculateReminderTimes(
        updateActivity.createdAt,
        updateActivity.endDate,
        updateActivity.repeat
      );
    }
    updateActivity.reminderTimes = reminderTime;
    const result = await updateActivity.save();
    const response = result.toObject();
    delete response.reminderTimes;

    return res.status(200).json(response);
  } else {
    return res.status(404).json({ message: "this activity is not found" });
  }
});
/**
 * @desc delete activity
 * @route /api/activity
 * @method delete
 * @access private (only user)
 * */
const deleteActiviy = asynchandler(async (req, res) => {
  const id = await Activity.findById(req.params.id).select("elderly");
  if (!(req.user.id == id.elderly.toString())) {
    return res
      .status(401)
      .json({ message: "not not allowed, only user himself" });
  }
  const activity = await Activity.findById(req.params.id);
  if (activity) {
    await Activity.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "activity has been deleted" });
  } else {
    return res.status(404).json({ message: "activity not found" });
  }
});
module.exports = {
  addActivity,
  updateActivity,
  deleteActiviy,
  getActivityByDate,
  getAllActivity,
};
