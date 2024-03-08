const express = require("express");
const getElderlyById = require("../controllers/profileController");
const router = express.Router();
router.get("/:id", getElderlyById);
module.exports = router;
