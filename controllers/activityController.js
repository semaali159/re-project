const asynchandler = require("express-async-handler");
const {
  Activity,
  validateAddActivity,
  validateUpdateActivity,
} = require("../model/activity");
const getAllActivity = asynchandler(async (req, res) => {
  // const token = req.headers.token;
  // const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  // console.log(decoded);
  const c_id = req.params.id;
  const activities = await Activity.find({ elderly: c_id });
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
  });
  const result = await activity.save();
  return res.status(201).json(result);
});
/**
 * @desc get medicin for home
 * @route /api/medicin
 * @method get
 * @access puplic
 * */
const getActivityByDate = asynchandler(async (req, res) => {
  const currentTime = Date.now();
  const date = new Date(currentTime);
  const activities = await Activity.find();
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
        },
      },
      { new: true }
    );
    res.status(200).json(updateActivity);
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
