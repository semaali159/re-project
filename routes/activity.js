const express = require("express");
const {
  addActivity,
  updateActivity,
  deleteActiviy,
  getAllActivity,
  getActivityByDate,
} = require("../controllers/activityController");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndOnlyUser,
} = require("../middleware/verifyToken");
const router = express.Router();
router
  .route("/:id")
  .get(verifyTokenAndOnlyUser, getAllActivity)
  .delete(verifyToken, deleteActiviy)
  .put(verifyToken, updateActivity)
  .post(verifyTokenAndOnlyUser, addActivity);
router.route("/").get(verifyToken, getActivityByDate);

// router.get("/", verifyToken, getMedicinByDate);
// router.post("/", verifyToken, addMedicin);
// router.put("/:id", verifyToken, updatemedicin);
// router.delete("/:id", verifyToken, deleteMedicin);
// router.get("/id", verifyToken, getAllMedicin);
module.exports = router;
