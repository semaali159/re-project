const asynchandler = require("express-async-handler");
const {
  Activity,
  validateAddActivity,
  validateUpdateActivity,
} = require("../model/activity");
const addActivity = asynchandler(async (req, res) => {
  const { error } = validateAddActivity(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const activity = new Activity({
    activityName: req.body.activityName,
    description: req.body.description,
  });
  const result = await activity.save();
  return res.status(201).json(result);
});
/**
 * @desc update book
 * @route /api/book
 * @method put
 * @access private (only admin)
 * */
const updateActivity = asynchandler(async (req, res) => {
  const { error } = validateUpdateActivity(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const updateActivity = await Activity.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        activityName: req.body.activityName,
        description: req.body.description,
      },
    },
    { new: true }
  );
  res.status(200).json(updateActivity);
});
