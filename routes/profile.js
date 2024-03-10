const express = require("express");
const getElderlyById = require("../controllers/profileController");
const { verifyTokenAndAuthorization } = require("../middleware/verifyToken");
const router = express.Router();
router.get("/:id", verifyTokenAndAuthorization, getElderlyById);
module.exports = router;
