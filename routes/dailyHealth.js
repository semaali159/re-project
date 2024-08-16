const express = require("express");
const {
  addBloodPresureValue,
  addDiabetesValue,
} = require("../controllers/dailyHealthController");
const { verifyTokenAndOnlyUser } = require("../middleware/verifyToken");
const router = express.Router();
router
  .route("/addBloodPressureValue/:id")
  .post(verifyTokenAndOnlyUser, addBloodPresureValue);
router
  .route("/addDiabetesValue/:id")
  .post(verifyTokenAndOnlyUser, addDiabetesValue);
module.exports = router;
