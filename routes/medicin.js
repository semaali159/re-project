const express = require("express");
const {
  addMedicin,
  updatemedicin,
  deleteMedicin,
  getAllMedicin,
  getMedicinByDate,
} = require("../controllers/medicinController");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndOnlyUser,
} = require("../middleware/verifyToken");
const router = express.Router();
router
  .route("/:id")
  .get(verifyTokenAndOnlyUser, getAllMedicin)
  .delete(verifyToken, deleteMedicin)
  .put(verifyToken, updatemedicin);
router
  .route("/")
  .post(verifyToken, addMedicin)
  .get(verifyToken, getMedicinByDate);
// router.get("/", verifyToken, getMedicinByDate);
// router.post("/", verifyToken, addMedicin);
// router.put("/:id", verifyToken, updatemedicin);
// router.delete("/:id", verifyToken, deleteMedicin);
// router.get("/id", verifyToken, getAllMedicin);
module.exports = router;
