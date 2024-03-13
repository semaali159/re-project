const express = require("express");
const {
  addMedicin,
  updatemedicin,
} = require("../controllers/medicinController");
const {
  verifyToken,
  verifyTokenAndAuthorization,
} = require("../middleware/verifyToken");
const router = express.Router();
router.put("/:id", verifyToken, updatemedicin);
router.post("/", verifyToken, addMedicin);
router.get("/", verifyToken, getAllMedicin);

module.exports = router;
 
