const express = require("express");
const {
  addDisease,
  getAllDiseases,
  getDiseasesById,
} = require("../controllers/diseaseController");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndOnlyUser,
} = require("../middleware/verifyToken");
const router = express.Router();
router.route("/").post(addDisease).get(getAllDiseases);
router.route("/:id").get(getDiseasesById);
module.exports = router;
